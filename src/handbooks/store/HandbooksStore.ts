import { ICommonStore } from './ICommonStore';

export interface HandbooksStore<T> extends ICommonStore {
  fetchData: () => Promise<T[]>;
  data: T[];
  createData: (arg0: T) => Promise<any >;
  updateData: (id: string, updatedData: Partial<T>) => Promise<void>;
}
