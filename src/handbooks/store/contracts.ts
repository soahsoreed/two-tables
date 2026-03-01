import { create } from 'zustand'
import { client } from '../../apollo/client';
import { GET_CONTRACTS } from '../requests/GET_CONTRACTS';
import { CustomHandbooksStore } from './CustomHandbooksStore';
import {OrganizationData} from "../../registry/interfaces.ts";
import {CREATE_CONTRACT} from "../api/insertNewContract.ts";
import {UPDATE_CONTRACTS} from "../api/updateContractByID.ts";

export interface IContract {
  id?: string;
  contract_number: string;
  organization_id: string;
  developer_organization_id?: string;
  developer_organization?: OrganizationData;
  date_start: string;
  date_end?: string
  timezone?: string;
  counterparty: string;
}

export const useContractsHandbook = create<CustomHandbooksStore<IContract>>(
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
        query: GET_CONTRACTS
      })
        .then(({ data }) => {
          const contracts = data.handbooks_contracts;

          if (contracts) {
            const reversed = contracts.slice().reverse();
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
    async createData(contract: IContract) {
      const options = {
        // mutation: CREATE_MANAGER,
        mutation: CREATE_CONTRACT,
        variables: {
          contract_number: contract.contract_number,
          developer_organization_id: contract.developer_organization_id,
          counterparty: contract.counterparty,
          date_start: contract.date_start,
        },
      };
      try {
        const res = await client.mutate(options)
        if (res.data.insert_handbooks_contracts_one) {
          set({successMessage: 'Запись добавлена.'})
        }
      } catch {
        set({error: 'Создание невозможно.'})
      }
    },
    updateData: async (id, updatedData) => {
      try {
        const res = await client.mutate({
          mutation: UPDATE_CONTRACTS,
          variables: {
            id: id,
            contract_number: updatedData.contract_number,
            developer_organization_id: updatedData.developer_organization_id,
            counterparty: updatedData.counterparty,
            date_start: updatedData.date_start
          },
        });
        if (res.data.update_handbooks_contracts_by_pk) {
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
