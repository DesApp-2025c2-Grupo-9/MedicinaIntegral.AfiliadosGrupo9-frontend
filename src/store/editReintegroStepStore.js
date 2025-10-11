import { create } from 'zustand';

export const useEditReintegroStep = create(set => ({
  currentStep: 1,
  setCurrentStep: value => {
    set({ currentStep: value });
  }
}));
