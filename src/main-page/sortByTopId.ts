import { IRecord } from "./IRecord";

export function sortByTopId(arr: IRecord[]) {
  const sorted = arr.toSorted((a, b) => a.topId - b.topId);
  return sorted;
}
