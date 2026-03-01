import { HandbooksStore } from './HandbooksStore';

export interface CustomHandbooksStore<T> extends HandbooksStore<T> {
  isModalOpen: boolean;
  successMessage: null | string;
  setSuccessMessage: (value: string | null) => void;
  setIsModalOpen(value: boolean): void;
  createData(value: T): Promise<any>;
  updateData: (id: string, updatedData: Partial<T>) => Promise<void>;
}
