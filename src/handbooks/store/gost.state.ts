import { create } from 'zustand'
import { client } from '../../apollo/client';
import { GET_GOST } from '../requests/GET_GOST';
import { CustomHandbooksStore } from './CustomHandbooksStore';
import { CREATE_GOST } from '../requests/CREATE_GOST';
import {UPDATE_GOST} from "../api/updadeGOSTByID.ts";

export interface IGost {
  gost_number: string;
  id: string;
  name: string;
}

export const useGostHandbook = create<CustomHandbooksStore<IGost>>(
  (set) => ({
    data: null,
    error: null,
    loading: false,
    isModalOpen: false,
    successMessage: null,
    setSuccessMessage:(value) => {set({ successMessage : value })},
    fetchData() {
      set({ loading: true });

      return client.query({
        query: GET_GOST
      })
        .then(({ data }) => {
          const gosts = data.handbooks_gost;

          if (gosts) {
            const reversed = gosts.slice().reverse();
            set({ data: reversed });
            return reversed;
          }
          throw new Error(data.error);
        })
        .catch(error => {
          set({ error });
        })
        .finally(() => {
          set({ loading: false });
        })
    },

    setError(_) {
      return
    },

    setLoading(value: boolean)  {
      set({ loading: value })
    },

    setIsModalOpen(value: boolean)  {
      set({ isModalOpen: value })
    },

    async createData(gost: IGost) {
      const options = {
        mutation: CREATE_GOST,
        variables: {
          name: gost.name,
          gostNumber: gost.gost_number,
        },
      };
      try {
        const res = await client.mutate(options)
        if (res.data.insert_handbooks_gost_one) {
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
          mutation: UPDATE_GOST,
          variables: {
            id: id,
            gost_number: updatedData.gost_number,
            name: updatedData.name,
          },
        });
        if (res.data.update_handbooks_gost_by_pk) {
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

