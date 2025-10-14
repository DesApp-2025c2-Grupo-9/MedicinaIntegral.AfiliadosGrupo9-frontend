import { create } from 'zustand';

export const useStateFilter = create(set => ({
  state: 'Todos',
  updateState: newState => set({ state: newState })
}));
