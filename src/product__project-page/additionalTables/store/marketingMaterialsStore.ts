import { create } from 'zustand'
import {CustomAdditionalStore, IAdditionalData} from "../interfaces.ts";
import {client} from "../../../apollo/client.ts";
import {UPDATE_EDU_MATERIAL} from "../api/learningMaterials/updateLearningMaterial.ts";
import {GET_EDU_MATERIALS} from "../api/learningMaterials/getLearningMaterials.ts";
import {INSERT_MARKETING_MATERIAL_ONE} from "../api/marketingMaterials/createMarketingMaterial.ts";
import {DELETE_MARKETING_MATERIAL} from "../api/marketingMaterials/deleteMarketingMaterial.ts";

export const useMarketingMaterials = create<CustomAdditionalStore<IAdditionalData>>(
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
        query: GET_EDU_MATERIALS
      })
        .then(({ data }) => {
          const eduMaterials = data.edu_materials;

          if (eduMaterials) {
            set({ data: eduMaterials.slice().reverse() });
            return eduMaterials.slice().reverse();
          } else {
            return
          }
        })
        .catch(_ => {
          return
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
    async createData(obj) {
      // console.log('obj', obj)
      const options = {
        // mutation: CREATE_MANAGER,
        mutation: INSERT_MARKETING_MATERIAL_ONE,
        variables: {
          register_entity_id: obj.register_entity_id,
          creator_name: obj.creator_name,
          comment: obj.comment,
          link: obj.link,
          created_at: obj.created_at,
        },
      };
      try {
        const res = await client.mutate(options)
        if (res.data.insert_marketing_materials_one) {
          set({successMessage: 'Запись добавлена.'})
        }
      } catch {
        set({error: 'Создание невозможно.'})
      }
    },
    updateData: async (id, updatedData) => {
      try {
        const res = await client.mutate({
          mutation: UPDATE_EDU_MATERIAL,
          variables: {
            id: id,
            creator_name: updatedData.creator_name,
            comment: updatedData.comment,
            link: updatedData.link,
            created_at: updatedData.created_at
          },
        });
        if (res.data.update_edu_materials_by_pk) {
          set({ successMessage: 'Запись обновлена.' });
          return
        } else {
          set({ error: 'Обновление невозможно.' });
        }
      } catch {
        set({ error: 'Обновление невозможно.' });
      }
    },
    deleteData: async (id) => {
      try {
        const res = await client.mutate({
          mutation: DELETE_MARKETING_MATERIAL,
          variables: {
            id: id,
          },
        });
        if (res.data.update_marketing_materials_by_pk) {
          set({ successMessage: 'Запись удалена.' });
          return
        } else {
          set({ error: 'Удаление невозможно.' });
        }
      } catch {
        set({ error: 'Удаление невозможно.' });
      }
    },
  }),
)
