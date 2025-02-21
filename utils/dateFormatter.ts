export const dateFormatter = (date: string | number | Date) => {
  const formatted = new Date(date);
  const h = formatted.getHours();
  const m = formatted.getMinutes();
  const minFormatter = m < 10 ? `0${m}` : m;
  return `${h}:${minFormatter}`;
};
