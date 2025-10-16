import { useEditReintegroStep } from '../store/editReintegroStepStore';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';

export const useEditReintegroHandler = () => {
  const { setCurrentStep } = useEditReintegroStep(state => state);
  const { data, setData } = useNuevoReintegroStore();

  const onSubmit = inputData => {
    setData({ ...data, ...inputData });
    setCurrentStep(2);
  };

  return { onSubmit };
};
