export default function pluralize(s: string, num?: string | null): string {
  const n = Number(num);
  let res = "";
  if (!isNaN(n)) {
    res = `${num} ${s}`;
    if (n > 1) {
      res += "s";
    }
  }
  return res;
}
