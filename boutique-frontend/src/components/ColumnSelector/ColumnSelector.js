import React, { useEffect } from 'react';

useEffect(() => {
    const fetchColumns = async () => {
        const response = await fetch('/api/columns');
        const data = await response.json();
        setColumns(data);
    };

    fetchColumns();
}, []);

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
