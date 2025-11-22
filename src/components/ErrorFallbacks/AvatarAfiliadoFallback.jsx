import { RefreshCcw } from 'lucide-react';

function AvatarAfiliadoFallback({ error, resetErrorBoundary }) {
  return (
    <button
      onClick={resetErrorBoundary}
      className='text-rojo-alerta hover:underline cursor-pointer bg-red-100 border border-rojo-alerta rounded-lg py-1 px-2 flex items-center gap-1.5'
    >
      Reintentar
      <RefreshCcw
        strokeWidth={1.4}
        size={20}
      />
    </button>
  );
}
export default AvatarAfiliadoFallback;
