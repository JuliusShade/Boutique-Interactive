import React from 'react';

const Filtering = ({ availableColumns, onFilterChange }) => {
  return (
    <div>
      {availableColumns.map((column) => (
        <div key={column}>
          <label>{`Filter by ${column}: `}</label>
          <input
            type="text"
            onChange={(e) => onFilterChange(column, e.target.value)}
            placeholder={`Filter ${column}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Filtering;
