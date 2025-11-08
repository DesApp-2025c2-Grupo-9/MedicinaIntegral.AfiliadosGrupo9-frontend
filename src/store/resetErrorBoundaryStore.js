import { create } from 'zustand';

export const useResetErrorBoundaryStore = create(set => ({
  resetErrorBoundary: undefined,
  setResetErrorBoundary: value => {
    set({ resetErrorBoundary: value });
  }
}));
