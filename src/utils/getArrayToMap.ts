export function getArrayToMap<T>(array: Array<T>, id: keyof T) {
  const map = new Map();
  for (const item of array) {
    map.set(item[id], item);
  }
  return map;
}
