
function RowTabla({ head, content, index }) {
    const bgGris = 'bg-gray-200'
    return (
        <tr className={`${index % 2 == 0? bgGris : ''}`}>
            <th scope="row" className="px-6 py-4 font-medium">
                {head}
            </th>
            {content.map(
                (contenido, index) =>
                <td className="px-6 py-4" key={index}>
                    
                    {contenido}
                </td>
            )}
        </tr>
    )
}




export default RowTabla