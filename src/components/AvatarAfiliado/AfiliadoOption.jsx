import clsx from 'clsx';

function AfiliadoOption({ nombreAfiliado='Nombre Afiliado' }) {
  const isActive = false; // Basándonos en la URL actual, definiremos el valor de isActive

  return (
    <div className={clsx('flex gap-2 items-center hover:text-menta-200 cursor-pointer w-fit', {
      'text-negro-principal': !isActive,
      'text-menta-500': isActive
    })}>
      <div className='h-4 aspect-square bg-yellow-400'>
      </div>
      <p className='text-sm font-medium'>{nombreAfiliado}</p>
    </div>
  )
}
export default AfiliadoOption