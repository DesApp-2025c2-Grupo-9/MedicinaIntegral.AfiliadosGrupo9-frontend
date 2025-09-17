import clsx from 'clsx';

function AfiliadoOption({ nombreAfiliado='Nombre Afiliado' }) {
  const isActive = false; // Basándonos en la URL actual, definiremos el valor de isActive

  return (
    <div className={clsx('flex gap-2 items-center hover:text-menta-200 cursor-pointer w-fit', {
      'text-negro-principal': !isActive,
      'text-menta-500': isActive
    })}>
      <div className='h-4 aspect-square flex items-center justify-center'>
        <svg className='w-full aspect-square' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12C12.7571 12 14.9921 9.31371 14.9921 6C14.9921 2.68629 12.7571 0 10 0C7.24297 0 5.00793 2.68629 5.00793 6C5.00793 9.31371 7.24297 12 10 12Z" fill="currentColor"/>
          <path d="M19.7845 17.1C18.8859 15.3 17.1886 13.8 14.9921 12.9C14.393 12.7 13.6941 12.7 13.1949 13C12.1965 13.6 11.1981 13.9 10 13.9C8.8019 13.9 7.80348 13.6 6.80506 13C6.30585 12.8 5.60696 12.7 5.00791 13C2.81139 13.9 1.11408 15.4 0.2155 17.2C-0.483392 18.5 0.614868 20 2.1125 20H17.8875C19.3851 20 20.4834 18.5 19.7845 17.1Z" fill="currentColor"/>
        </svg>
      </div>

      <p className='text-sm font-medium'>{nombreAfiliado}</p>
    </div>
  )
}
export default AfiliadoOption