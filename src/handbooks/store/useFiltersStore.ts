  import { create } from 'zustand';
  import { persist } from 'zustand/middleware';

  export const useFiltersStore = create(
    persist(
      (set) => ({
        filters: {},
        setFilters: (newFilters) => set({ filters: newFilters }),
        clearFilter: (key) => set((state) => {
          const filters = { ...state.filters };
          delete filters[key];
          return { filters };
        }),
      }),
      {
        name: 'table-filters', // имя для хранения в localStorage
      }
    )
  );