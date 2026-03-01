import { create } from 'zustand'
import { client } from '../../apollo/client';
import { GET_GOST_DOCUMENTS } from '../requests/GET_GOST_DOCUMENTS';
import { CREATE_GOST_DOCUMENT } from '../requests/CREATE_GOST_DOCUMENT';
import { CustomHandbooksStore } from './CustomHandbooksStore';
import { GostData } from '../../registry/interfaces';
import {UPDATE_GOST_DOCUMENT} from "../api/updateGostDocumentByID.ts";

export interface IGostDocument {
  code: string;
  gostId: string;
  id: string;
  name: string;
  project_stage: string;
  gost: GostData;
  gost_number: string;
}

export const useGostDocumentsHandbook = create<CustomHandbooksStore<IGostDocument>>(
  (set) => ({
    data: null,
    error: null,
    loading: false,
    isModalOpen: false,
    successMessage: null,
    setSuccessMessage: (value) => set({ successMessage: value }),
    fetchData: async () => {
      try {
        set({ loading: true });
        const { data } = await client.query({ query: GET_GOST_DOCUMENTS });
        const docs = data.handbooks_gost_documents;
        const reversed = docs.slice().reverse();
        set({ data: reversed });
        return reversed;
      } catch (error) {
        return null;
      } finally {
        set({ loading: false });
      }
    },
    setError: ((_) => {return null}),
    setLoading: (value) => set({ loading: value }),
    setIsModalOpen: (value) => set({ isModalOpen: value }),
    createData: async (data: IGostDocument) => {
      try {
        const { data: mutationData } = await client.mutate({
          mutation: CREATE_GOST_DOCUMENT,
          variables: {
            code: data.code,
            gostId: data.gostId,
            name: data.name,
            projectStage: data.project_stage,
          },
        });
        if (mutationData.insert_handbooks_gost_documents_one) {
          set({ successMessage: 'Запись создана.' });
        } else {
          set({ error: 'Создание невозможно.' });
        }
      } catch (error) {
        return null
      }
    },
    updateData: async (id, updatedData) => {
      try {
        const res = await client.mutate({
          mutation: UPDATE_GOST_DOCUMENT,
          variables: {
            id: id,
            gostId: updatedData.gostId,
            projectStage: updatedData.project_stage,
            code: updatedData.code,
            name: updatedData.name,
          },
        });
        if (res.data.update_handbooks_gost_documents_by_pk) {
          set({ successMessage: 'Запись обновлена.' });
          return
        } else {
          set({ error: 'Обновление невозможно.' });
        }
      } catch {
        set({ error: 'Обновление невозможно.' });
      }
    },
  }),
)