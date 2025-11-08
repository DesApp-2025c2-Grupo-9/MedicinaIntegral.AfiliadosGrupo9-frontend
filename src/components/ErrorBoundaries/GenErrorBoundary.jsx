import { useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function GenErrorBoundary({ FallbackComponent, fallback, queryKeyToReset = '', children }) {
  const queryClient = useQueryClient();
  const handleError = error => {
    if (error.message.includes('401')) throw error;
  };

  return (
    <ErrorBoundary
      onReset={() => queryClient.resetQueries({ queryKey: queryKeyToReset, exact: false })}
      FallbackComponent={FallbackComponent}
      fallback={fallback}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
}
export default GenErrorBoundary;
