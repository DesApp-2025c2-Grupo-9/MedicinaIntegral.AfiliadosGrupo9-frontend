import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function GenErrorBoundary({ FallbackComponent, fallback, children }) {
  const { reset } = useQueryErrorResetBoundary();
  const handleError = error => {
    if (error?.response?.status === 401) throw error;
    // if (error?.message?.includes('401')) throw error;
  };

  return (
    <ErrorBoundary
      // onReset={() => queryClient.resetQueries({ queryKey: queryKeyToReset, exact: false })}
      onReset={reset}
      FallbackComponent={FallbackComponent}
      fallback={fallback}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
}
export default GenErrorBoundary;
