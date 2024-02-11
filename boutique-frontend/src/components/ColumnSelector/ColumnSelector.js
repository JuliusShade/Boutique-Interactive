import React, { useState, useEffect } from 'react';

const ColumnSelector = ({ columns, selectedColumns, setSelectedColumns }) => {
  const [availableColumns, setAvailableColumns] = useState([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch('/api/boutiques/columns');
        const columnNames = await response.json(); // This should directly be an array of column names
        console.log('Fetched columns data:', columnNames); // Log to confirm
        setAvailableColumns(columnNames);
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchColumns();
  }, []);

  const handleChange = (event) => {
    // For a multi-select, you need to handle multiple options being selected
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedColumns(values);
  };

  console.log('Rendering availableColumns:', availableColumns);
  console.log('Selected Columns:', selectedColumns);
  return (
    <select multiple value={selectedColumns} onChange={handleChange}>
      {availableColumns.map((columnName, index) => (
        <option key={index} value={columnName}>
          {columnName}
        </option>
      ))}
    </select>
  );
};

export default ColumnSelector;
