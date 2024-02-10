import React from 'react';

const DataTable = ({ data }) => {
  console.log('Rendering data in DataTable:', data);
  return (
    <table>
      <thead>
        <tr>
          {data.columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {data.columns.map((column) => (
              <td key={`${rowIndex}-${column}`}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
