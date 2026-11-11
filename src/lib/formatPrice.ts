/** Euro display for the table-booking prototype (e.g. 300,00 €). */
export function formatPrice(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(rounded);
}
