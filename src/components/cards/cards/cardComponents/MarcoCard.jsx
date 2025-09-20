
function MarcoCard({children, estilo = ''}) {
    //Marco con el estilo por defecto de las cards
    
  return (
    <div className={`grid m-3 p-3 bg-white rounded-xl shadow-md border border-gray-200 ${estilo}`}>
        {children}
        
        </div>
  )
}

export default MarcoCard