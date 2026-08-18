/** Mexican peso display for Bahidorá (MXN $3,390). */
export function formatPrice(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const hasCents = Math.abs(rounded % 1) >= 0.005;
  const formatted = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rounded);
  return `MXN $${formatted}`;
}
