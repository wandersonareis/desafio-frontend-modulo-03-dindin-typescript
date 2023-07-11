export type isoDate = string | Date;

export function toPtBrDateFormatter(date: isoDate): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function toPtBrWeekDay(date: isoDate): string {
  return new Date(date).toLocaleDateString("pt-BR", { weekday: "long" });
}

export function onlyDate(date: isoDate): string {
  const dateParse: Date = new Date(date);
  return dateParse.toISOString().slice(0, 10);
}

export function toIsodateString(date: isoDate): string {
  console.log(date);
  
  const now: Date = new Date();
  const timeString: string = now.toLocaleTimeString("pt-BR", { hour12: false });
  const dateTimeString = `${date}T${timeString}.000Z`;
  const dateTime: Date = new Date(dateTimeString);
  return dateTime.toISOString();
}
