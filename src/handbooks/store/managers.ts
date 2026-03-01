import { create } from 'zustand'
import { client } from '../../apollo/client';
import { GET_MANAGERS } from '../requests/GET_MANAGERS';
import { CustomHandbooksStore } from './CustomHandbooksStore';
// import { CREATE_GOST } from '../requests/CREATE_GOST';
import { CREATE_MANAGER } from '../requests/CREATE_MANAGER';
import {UPDATE_MANAGER} from "../api/updateManagersByID.ts";

export interface IManager {
  id?: string;
  name: string; 
  email: string;
}

export const useManagersHandbook = create<CustomHandbooksStore<IManager>>(
  (set) => ({
    data: null,
    error: null,
    loading: true,
    isModalOpen: false,
    successMessage: null,
    setSuccessMessage:(value) => {set({ successMessage : value })},
    fetchData() {
      set({ loading: true });

      return client.query({
        query: GET_MANAGERS
      })
        .then(({ data }) => {
          const managers = data.handbooks_managers;

          if (managers) {
            const reversed = managers.slice().reverse();
            set({ data: reversed });
            return reversed;
          }
          return
        })
        .catch(_ => {
          return
        })
        .finally(() => {
          set({ loading: false });
        })
    },
    setError() {
      return
    },

    setLoading(value: boolean)  {
      set({ loading: value })
    },

    setIsModalOpen(value: boolean)  {
      set({ isModalOpen: value })
    },

    async createData(manager: IManager) {
      const options = {
        mutation: CREATE_MANAGER,
        variables: {
          name: manager.name,
          email: manager.email,
        },
      };
      try {
        const res = await client.mutate(options)
        if (res.data.insert_handbooks_managers_one) {
          set({successMessage: 'Запись добавлена.'})
        } else {
          set({error: 'Создание невозможно.'})
        }
      } catch {
        set({error: 'Создание невозможно.'})
      }
    },
    updateData: async (id, updatedData) => {
      try {
        const res = await client.mutate({
          mutation: UPDATE_MANAGER,
          variables: {
            id: id,
            name: updatedData.name,
            email: updatedData.email
          },
        });
        if (res.data.update_handbooks_managers_by_pk) {
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
