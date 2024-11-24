export function getArrayToMap<T, K extends keyof T>(
  array: Array<T>,
  keyName: K
): Map<T[K], T> {
  const map = new Map<T[K], T>();
  for (const item of array) {
    map.set(item[keyName], item);
  }
  return map;
}
