import { IRecord } from "./IRecord";

export function sortBySortIndex(arr: IRecord[]) {
  const sorted = arr.toSorted((a, b) => a.sortIndex - b.sortIndex);
  return sorted;
}
