import { create } from 'zustand'

export enum additionalTablesTypes {
  learningMaterials = 'learningMaterials',
  marketingMaterials = 'marketingMaterials',
  workspaces = 'workspaces',
  documents = 'documents',
}

interface IInitialValues {
  comment?: string;
  link?: string;
  creator_name?: string;
  created_at?: string;
  id: string;
}

interface IHandbookModalStore {
  isModalOpen: boolean;
  isEdit: boolean;
  idForDelete: null | string;
  initialValues: null | IInitialValues;
  setIsModalOpen(isModalOpen: boolean): void;
  setIdForDelete(id: string): void;
  modalType: additionalTablesTypes;
  setModalType(additionalTablesTypes): void;
  setIsEdit(isEdit: boolean): void;
  setInitialValues(record);
}

export const useAdditionalTablesModals = create<IHandbookModalStore>(
  (set) => ({
    isModalOpen: false,
    modalType: null,
    isEdit: false,
    idForDelete: null,
    initialValues: null,
    setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
    setModalType: (modalType: additionalTablesTypes) => set({ modalType }),
    setIsEdit: (isEdit: boolean) => set({ isEdit }),
    setInitialValues: (record) => set({ initialValues: record }),
    setIdForDelete: (id) => set({ idForDelete: id }),
  }),
)
