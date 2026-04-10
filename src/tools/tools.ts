export function monthToNewYear(month: string) {
  if (parseInt(month) == 12) return "01";
  else return "0" + (parseInt(month) + 1).toString();
}
