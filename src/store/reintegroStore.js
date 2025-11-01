import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useReintegroStore = create(
  persist(
    set => ({
      reintegro: {},
      setReintegro: value => {
        set({ reintegro: value });
      }
    }),
    {
      name: 'reintegroStorage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
