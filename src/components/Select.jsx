import { twMerge } from 'tailwind-merge';

function Select({ id, label, placeholder='Placeholder', errorMsg, options=['John Doe', 'Jane Doe'], ...props }) {
  const baseStyles = 'flex min-w-40 min-h-[43px] p-3 pl-4 items-center self-stretch rounded-lg border border-gris-border bg-blanco-principal text-base outline-none';

  return (
    <div className='flex self-stretch flex-col items-start gap-2 w-full'>
      { label && <label htmlFor={id} className='text-base font-bold w-fit select-none'>{label}</label> }
      <select id={id} name={id} className={baseStyles} defaultValue={placeholder} {...props}>
        <option disabled className={twMerge(baseStyles, 'bg-gris-border border-0 rounded-none')}>{placeholder}</option>
        {
          options.map((option, index) =>
            <option key={index} value={option} className={twMerge(baseStyles, 'hover:bg-menta-100 border-0 border-t rounded-none')}>
              {option}
            </option>
          )
        }
      </select>
      { errorMsg && <p className='text-rojo-alerta text-sm w-fit'>{errorMsg}</p> }
    </div>
  )
}
export default Select