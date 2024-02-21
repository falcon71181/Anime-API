export function substringAfter(str: string, toFind: string) {
  const index = str.indexOf(toFind);
  return index == -1 ? "" : str.substring(index + toFind.length);
}

export function substringBefore(str: string, toFind: string) {
  const index = str.indexOf(toFind);
  return index == -1 ? "" : str.substring(0, index);
}
