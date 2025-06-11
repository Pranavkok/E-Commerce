import React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'


function DisplayTable({data,column}) {

    const table = useReactTable({
        data,
        columns : column,
        getCoreRowModel: getCoreRowModel(),
      })

  return (
    <div className="p-2">
      <table className='w-full px-0 py-0 border-collapse'>
        <thead className='bg-black text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th>Sr.No</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border whitespace-nowrap'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row,index) => (
            <tr key={row.id}>
              <td className='border px-2 py-1 whitespace-nowrap'>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border px-2 py-1'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />

    </div>
  )
}

export default DisplayTable
