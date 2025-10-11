import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useNuevoReintegroStore = create(
  persist(
    set => ({
      data: {},
      setData: value => {
        set({ data: value });
      }
    }),
    {
      name: 'nuevoReintegroStorage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
