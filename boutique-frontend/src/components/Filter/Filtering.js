import React, { useState } from 'react';

const SortingFiltering = ({
  onFilterChange,
  onSortChange,
  availableColumns,
}) => {
  const [filterValues, setFilterValues] = useState({});
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleFilterChange = (column, value) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [column]: value,
    }));
  };

  const handleApplyFilter = () => {
    onFilterChange(filterValues);
  };

  return (
    <div>
      <div>
        {availableColumns.map((column) => (
          <div key={column}>
            <label>Filter By: {column}</label>
            <input
              type="text"
              placeholder={`Enter Filter Value for ${column}`}
              value={filterValues[column] || ''}
              onChange={(e) => handleFilterChange(column, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleApplyFilter}>Apply Filters</button>
      </div>
      <div>
        <label>Sort By: </label>
        <select onChange={(e) => setSelectedColumn(e.target.value)}>
          <option value="">Select Column</option>
          {availableColumns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <button onClick={() => onSortChange(selectedColumn, 'ASC')}>Asc</button>
        <button onClick={() => onSortChange(selectedColumn, 'DESC')}>
          Desc
        </button>
      </div>
    </div>
  );
};

export default SortingFiltering;
