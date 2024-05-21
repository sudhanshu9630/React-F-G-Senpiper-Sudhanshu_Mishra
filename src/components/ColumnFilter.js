import React from 'react'

const ColumnFilter = ({ column }) => {
    const {filterValue, setFilter} = column
  return (
      <span>
          <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} autoComplete="new-password"/>
    </span>
  )
}

export default ColumnFilter