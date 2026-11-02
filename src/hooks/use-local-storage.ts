"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

const STORAGE_EVENT = "lacamiseta:storage";

type CacheEntry = {
  raw: string | null;
  value: unknown;
};

const cache = new Map<string, CacheEntry>();
const fallbackCache = new Map<string, unknown>();

function getFallback<T>(key: string, initialValue: T): T {
  if (!fallbackCache.has(key)) {
    fallbackCache.set(key, initialValue);
  }
  return fallbackCache.get(key) as T;
}

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return getFallback(key, initialValue);
  }

  const raw = window.localStorage.getItem(key);
  const cached = cache.get(key);

  if (cached && cached.raw === raw) {
    return cached.value as T;
  }

  let value = getFallback(key, initialValue);
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = getFallback(key, initialValue);
    }
  }

  cache.set(key, { raw, value });
  return value;
}

function subscribe(key: string, callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      cache.delete(key);
      callback();
    }
  };

  const onLocalStorage = (event: Event) => {
    const detail = (event as CustomEvent<{ key: string }>).detail;
    if (!detail || detail.key === key) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(STORAGE_EVENT, onLocalStorage);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STORAGE_EVENT, onLocalStorage);
  };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialRef = useRef(initialValue);

  const getSnapshot = useCallback(() => readValue(key, initialRef.current), [key]);
  const getServerSnapshot = useCallback(() => getFallback(key, initialRef.current), [key]);
  const subscribeToStore = useCallback((callback: () => void) => subscribe(key, callback), [key]);

  const value = useSyncExternalStore(subscribeToStore, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (next: T | ((current: T) => T)) => {
      if (typeof window === "undefined") return;

      try {
        const current = readValue(key, initialRef.current);
        const valueToStore = typeof next === "function" ? (next as (current: T) => T)(current) : next;
        const raw = JSON.stringify(valueToStore);

        window.localStorage.setItem(key, raw);
        cache.set(key, { raw, value: valueToStore });
        window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
      } catch {
        // ignore
      }
    },
    [key]
  );

  return [value, setValue] as const;
}
