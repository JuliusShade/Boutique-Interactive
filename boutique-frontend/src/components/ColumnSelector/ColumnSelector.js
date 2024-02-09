import React from 'react';

const ColumnSelector = ({ columns, selectedColumns, setSelectedColumns }) => {
    const handleChange = (event) => {
        setSelectedColumns(event.target.value);
    };

    return (
        <select multiple value={selectedColumns} onChange={handleChange}>
            {columns.map(column => (
                <option key={column} value={column}>{column}</option>
            ))}
        </select>
    );
};

export default ColumnSelector;
