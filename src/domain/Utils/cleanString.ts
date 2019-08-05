export function cleanString(str: string) {
  return str
    .trim()
    .replace(/\n/g, ' ')
    .replace(/ +(?= )/g, '');
}
