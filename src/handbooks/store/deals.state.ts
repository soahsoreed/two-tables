import { create } from 'zustand'
import { client } from '../../apollo/client';
import { GET_GOST } from '../requests/GET_GOST';
import { CustomHandbooksStore } from './CustomHandbooksStore';
import { CREATE_GOST } from '../requests/CREATE_GOST';
import {UPDATE_DEALS} from "../api/updateDealByID.ts";

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
    updateData: async (id, _) => {
      try {
        const res = await client.mutate({
          mutation: UPDATE_DEALS,
          variables: {
            id: id,

          },
        });
        if (res.data.update_handbooks_deals_by_pk) {
          set({ successMessage: 'Запись обновлена.' });
          return
        } else {
          set({ error: 'Обновление невозможно.' });
        }
      } catch {
        set({ error: 'Обновление невозможно.' });
      }
    },

    createData(gost: IGost) {
      const options = {
        mutation: CREATE_GOST,
        variables: {
          name: gost.name,
          gostNumber: gost.gost_number,
        },
      };

      return client.mutate(options);
    }
  }),
)

