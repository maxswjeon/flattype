export function getParentKey(key: string): string {
  return key.split("__").slice(0, -1).join("__");
}
