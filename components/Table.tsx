import React from 'react'
import { getTranslations } from 'next-intl/server';
import { getLocale } from "next-intl/server";

const Table = async({
  columns,
  renderRow,
  data
}
: {
  columns: { header: string; accessor: string; className?: string }[],
  renderRow: (item: any) => React.ReactNode,
  data: any[]
}) => {
  const t = await getTranslations('table.col')
  const locale = await getLocale()
  return (
    <table className='w-full mt-4'>
      <thead>
        <tr className= {`${locale == "en" ? "text-left" : "text-right"} text-gray-600 text-sm`} >
          {columns.map((column,index) => (
            <th key={index}
             className={column.className}
             >
              {t(column.header)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {renderRow(item)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default Table
