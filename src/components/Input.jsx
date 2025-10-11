function Input({ id, label, errorMsg, isTextArea = false, ...props }) {
  const baseStyles =
    'flex min-w-40 min-h-[43px] p-3 pl-4 items-center self-stretch rounded-lg border border-gris-border bg-blanco-principal text-base outline-none focus:border-menta-600';

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
      {!isTextArea ? (
        <input
          id={id}
          name={id}
          className={baseStyles}
          {...props}
        />
      ) : (
        <textarea
          id={id}
          name={id}
          className={`${baseStyles} resize-none max-h-36`}
          {...props}
        ></textarea>
      )}
      {errorMsg && <p className='text-rojo-alerta text-sm w-fit'>{errorMsg}</p>}
    </div>
  );
}
export default Input;
