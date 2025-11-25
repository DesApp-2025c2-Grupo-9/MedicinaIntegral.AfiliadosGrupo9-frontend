import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAutorizacionStore = create(
  persist(
    set => ({
      autorizacion: {},
      setAutorizacion: value => {
        set({ autorizacion: value });
      }
    }),
    {
      name: 'autorizacionStorage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
