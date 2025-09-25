import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useReintegrosFormStore = create(
  persist(
    (set) => ({
      data: {},
      setData: (value) => {
        set({ data: value })
      }
    }),
    {
      name: 'reintegros-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);