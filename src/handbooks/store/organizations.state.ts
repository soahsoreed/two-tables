import { create } from 'zustand'
import { client } from '../../apollo/client';
import { GET_ORGANIZATIONS } from '../requests/GET_ORGANIZATIONS';
import { CREATE_ORGANIZATION } from '../requests/CREATE_ORGANIZATION';
import { CustomHandbooksStore } from './CustomHandbooksStore';
import {UPDATE_ORGANIZATION} from "../api/updateOrganisationByID.ts";

export interface IOrganization {
  code: string;
  id: string;
  name: string;
}

export const useOrganizationsHandbook = create<CustomHandbooksStore<IOrganization>>(
  (set) => ({
    data: null,
    error: null,
    loading: true,
    isModalOpen: false,
    successMessage: null,
    setSuccessMessage: (value) => set({ successMessage: value }),
    fetchData: async () => {
      try {
        set({ loading: true });
        const { data } = await client.query({ query: GET_ORGANIZATIONS });
        const organizations = data.handbooks_organizations;
        const reversed = organizations.slice().reverse();
        set({ data: reversed });
        return reversed;
      } catch (error) {
        return null
      } finally {
        set({ loading: false });
      }
    },
    setError: (error) => set({ error }),
    setLoading: (value) => set({ loading: value }),
    setIsModalOpen: (value) => set({ isModalOpen: value }),
    createData: async (organization: IOrganization) => {
      try {
        const { data } = await client.mutate({
          mutation: CREATE_ORGANIZATION,
          variables: {
            name: organization.name,
            code: organization.code,
          },
        });
        if (data && data.insert_handbooks_organizations_one) {
          set({ successMessage: 'Запись добавлена.' });
          return data;
        }
      } catch (error) {
        return null;
      }
    },
    updateData: async (id, updatedData) => {
      try {
        const res = await client.mutate({
          mutation: UPDATE_ORGANIZATION,
          variables: {
            id: id,
            code: updatedData.code,
            name: updatedData.name,
          },
        });
        if (res.data.update_handbooks_organizations_by_pk) {
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
