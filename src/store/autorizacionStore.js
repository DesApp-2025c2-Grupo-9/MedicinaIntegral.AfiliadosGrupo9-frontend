import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAutorizacionStore = create(
  persist(
    set => ({
      autorizacion: {},
      paraAfiliado: "",
      setAutorizacion: value => {
        set({ autorizacion: value });
      },
      setParaAfiliado: value => {
        set({ paraAfiliado: value })
      }
    }),
    {
      name: 'autorizacionStorage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
