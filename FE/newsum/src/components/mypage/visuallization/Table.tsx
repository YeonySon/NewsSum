

function Table({ title, data }) {


  return (
    <>
      <p>{ title }</p>
      <table>
        <tbody>
          {data.map((item: string, index: number) => (
            <tr key={ index }>
              <td>{ index + 1 }</td>
              <td>{ item }</td>
            </tr>
          ))}
        </tbody>

      </table>
    </>
  )
}

export default Table;
