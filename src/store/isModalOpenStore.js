import { create } from 'zustand';

export const useIsModalOpen = create(set => ({
  isModalOpen: false,
  setIsModalOpen: value => {
    set({ isModalOpen: value });
  }
}));
