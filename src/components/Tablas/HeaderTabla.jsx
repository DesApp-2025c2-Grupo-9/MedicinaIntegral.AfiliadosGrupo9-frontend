

function HeaderTabla({ headers }) {
  return (
    <thead className="text-black border-b-1">
      <tr>
        {headers.map(
          (head, index) => <th scope="col" className="px-6 py-3" key={index}>
            {head}
          </th>
        )}
      </tr>
    </thead>
  )
}

export default HeaderTabla