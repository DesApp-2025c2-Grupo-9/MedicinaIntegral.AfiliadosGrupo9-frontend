function Select({ id, label, errorMsg, options = [],placeholder = false, ...props }) {
  const baseStyles = 'flex min-w-40 min-h-[43px] p-3 pl-4 items-center self-stretch rounded-lg border border-gris-border bg-blanco-principal text-base outline-none';
  
  return (
    <div className='flex self-stretch flex-col items-start gap-2 w-full'>
      {label && (
        <label
          htmlFor={id}
          className='text-base font-bold w-fit select-none'
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        className={baseStyles}
        //defaultValue=''
        {...props}
      >
        {/**Cambio para utilizar placeholder */}
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            className='p-3 pl-4 border-b last:border-b-0 border-gris-border cursor-pointer'
          >
            {option}
          </option>
        ))}
      </select>
      {errorMsg && <p className='text-rojo-alerta text-sm w-fit'>{errorMsg}</p>}
    </div>
  );
}
export default Select;
