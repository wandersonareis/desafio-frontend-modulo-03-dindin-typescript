export function toBrl(value: number): string {
  const localValue: number = value || 0;
  return (localValue / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatMoney(value: string): string {
  let formattedValue = value.replace(/\D/g, '');
  formattedValue = (parseFloat(formattedValue) / 100).toFixed(2) + '';
  formattedValue = formattedValue.replace('.', ',');
  formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return `$ ${formattedValue}`;
}

export function formatToCents(value: string): number {
  const onlyNumbers = value.replace(/\D/g, "");
  return parseInt(onlyNumbers);
}
