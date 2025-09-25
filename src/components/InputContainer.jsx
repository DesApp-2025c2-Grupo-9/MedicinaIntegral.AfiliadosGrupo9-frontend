function InputContainer({ children }) {
  return (
    <div className='flex flex-col md:flex-row self-stretch items-center gap-4'>
      {children}
    </div>
  )
}
export default InputContainer