function MenuButton({ children, className, onClick }) {
  return (
    <button type='button' onClick={onClick} className={`flex w-5 aspect-square justify-center items-center cursor-pointer hover:text-menta-200 ${className}`}>
      {children}
    </button>
  )
}
export default MenuButton