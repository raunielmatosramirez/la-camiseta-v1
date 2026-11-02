export function formatPrice(price: number, symbol = "$") {
  return `${symbol}${price.toFixed(2)}`;
}

export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
