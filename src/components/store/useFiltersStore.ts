
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const defaultRegisterFilterObject = {
  developer: null,
  customer: null,
  links: null,
  decimal_number: null,
  manager: null,
  deal_number: null,
  created_date: null,
  status: null,
}

export const defaultProductPageFilterObject = {
  gost: null,
  project_stage: null,
  name: null,
  decimal_number: null,
  link: null,
  created_at: null,
}

export const defaultAdditionalTableFilterObject = {
  link: null,
  creator_name: null,
  comment: null,
  created_at: null,
}


export const useRegisterFilters = create<IUseFiltersStoreInterfaces>()(
  persist(
    (set) => ({
      registerFilterObject: defaultRegisterFilterObject,
      setRegisterFilterObject: (...value) => set({ registerFilterObject: value }),
    }),
    {
      name: 'register-page-filters'
    },
  ),
)

export const useProductPageFilters = create<IUseProductPageFilterStore>()(
  persist(
    (set) => ({
      productPageFilterObject: defaultProductPageFilterObject,
      setProductPageFilterObject: (...value) => set({ productPageFilterObject: value }),
    }),
    {
      name: 'product-page-filters'
    },
  ),
)

export const useEduMaterialsPageFilters = create<IUseFilterStore>()(
  persist(
    (set) => ({
      pageFilterObject: defaultAdditionalTableFilterObject,
      setPageFilterObject: (...value) => set({ pageFilterObject: value }),
    }),
    {
      name: 'edu-materials-page-filters'
    },
  ),
)

export const useMarketingMaterialsPageFilters = create<IUseFilterStore>()(
  persist(
    (set) => ({
      pageFilterObject: defaultAdditionalTableFilterObject,
      setPageFilterObject: (...value) => set({ pageFilterObject: value }),
    }),
    {
      name: 'marketing-materials-page-filters'
    },
  ),
)
export const useWorkspacePageFilters = create<IUseFilterStore>()(
  persist(
    (set) => ({
      pageFilterObject: defaultAdditionalTableFilterObject,
      setPageFilterObject: (...value) => set({ pageFilterObject: value }),
    }),
    {
      name: 'workspace-page-filters'
    },
  ),
)