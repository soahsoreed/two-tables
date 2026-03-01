import { create } from 'zustand'
import { client } from '../../apollo/client';
import { HandbooksStore } from './HandbooksStore';
import { GET_DEALS } from '../requests/GET_DEALS';
import {CREATE_DEAL} from "../api/InsertNewDeal.ts";
import {UPDATE_DEALS} from "../api/updateDealByID.ts";
import dayjs from "dayjs";
import moment from "moment";

export interface IDeal {
  id?: string;
  deal_number: string;
  customer_organization_id?: string;
  developer_organization_id?: string;
  customer: string;
  project_manager: string;
  started_at: string;
}

export const useDealsHandbook = create<HandbooksStore<IDeal>>(
  (set) => ({
    data: null,
    error: null,
    loading: true,
    successMessage: null,
    setSuccessMessage:(value) => {set({ successMessage : value })},
    fetchData() {
      set({ loading: true });

      return client.query({
        query: GET_DEALS
      })
        .then(({ data }) => {
          const deals = data.handbooks_deals;

          if (deals) {
            const reversed = deals.slice().reverse();
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

    setError(error: Error) {
      set({ error: error.message })
    },

    setLoading(value: boolean)  {
      set({ loading: value })
    },

    async createData(deal: IDeal) {
      const options = {
        mutation: CREATE_DEAL,
        variables: {
          deal_number: deal.deal_number,
          customer: deal.customer,
          project_manager: deal.project_manager,
          started_at: deal.started_at
        },
      };
      try {
        const res = await client.mutate(options)
        if (res.data.insert_handbooks_deals) {
          set({successMessage: 'Запись добавлена.'})
        }
      } catch {
        set({error: 'Создание невозможно.'})
      }
    },
    updateData: async (id, updatedData) => {
      try {
        const startedAt = dayjs(updatedData.started_at).hour(0).minute(0).second(0).millisecond(0);
        const res = await client.mutate({
          mutation: UPDATE_DEALS,
          variables: {
            id: id,
            deal_number: updatedData.deal_number,
            customer: updatedData.customer,
            project_manager: updatedData.project_manager,
            started_at: startedAt.format()
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

  }),
)
