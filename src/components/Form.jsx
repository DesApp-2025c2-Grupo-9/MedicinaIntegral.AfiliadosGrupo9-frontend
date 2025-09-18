function Form({ onSubmit, children, legend }) {
  return (
    <form onSubmit={onSubmit} className='min-w-135 p-4 rounded-lg border border-gris-border bg-blanco-principal shadow-custom-shadow'>
      <fieldset className='flex flex-col items-start gap-4'>
        { legend && <legend className='font-bold text-base mb-4'>{legend}</legend> }
        {children}
      </fieldset>
    </form>
  )
}
export default Form