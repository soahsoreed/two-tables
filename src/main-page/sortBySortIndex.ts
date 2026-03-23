import { IRecord } from "./IRecord";

export function sortBySortIndex(arr: IRecord[]) {
  const sorted = arr.slice().sort((a, b) => a.sortIndex - b.sortIndex);
  return sorted;
}
