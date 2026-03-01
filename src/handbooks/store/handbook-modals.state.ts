import { create } from 'zustand'
import { CustomHandbookTypes } from '../components/custom-handbooks/custom-handbooks';
import {GostData} from "../../registry/interfaces.ts";

interface IInitialValues {
  gost?: GostData;
  id: string;
  name?: string;
  email?: string;
  project_stage?: string;
  code?: string;
  gost_number?: string;
  deal_number?: string;
  started_at?: string;
  project_manager?: string;
  customer?: string;
  contract_number?: string;
  developer_organization_id?: string;
  counterparty?: string;
  date_start?: string;
}

interface IHandbookModalStore {
  isModalOpen: boolean;
  isEdit: boolean;
  initialValues: null | IInitialValues;
  setIsModalOpen(isModalOpen: boolean): void;
  modalType: CustomHandbookTypes;
  setModalType(CustomHandbookTypes): void;
  setIsEdit(isEdit: boolean): void;
  setInitialValues(record);
}

export const useHandbookModals = create<IHandbookModalStore>(
  (set) => ({
    isModalOpen: false,
    modalType: null,
    isEdit: false,
    initialValues: null,
    setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
    setModalType: (modalType: CustomHandbookTypes) => set({ modalType }),
    setIsEdit: (isEdit: boolean) => set({ isEdit }),
    setInitialValues: (record) => set({ initialValues: record }),
  }),
)
