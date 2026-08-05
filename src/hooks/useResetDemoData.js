import { useMutation } from '@tanstack/react-query';
import { resetDemoData } from '../services/api';

export function useResetDemoData() {
  return useMutation({
    mutationFn: resetDemoData
  });
}