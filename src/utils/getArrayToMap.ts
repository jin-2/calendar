export function getArrayToMap<T>(
  array: Array<T>,
  keyName: keyof T
): Map<keyof T, T> {
  const map = new Map();
  for (const item of array) {
    map.set(item[keyName], item);
  }
  return map;
}
