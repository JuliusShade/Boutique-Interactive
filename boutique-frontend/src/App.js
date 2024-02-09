import React, { useState } from 'react';
import ColumnSelector from './components/ColumnSelector/ColumnSelector';
import SortingFiltering from './components/Filter/Filtering';
import DataTable from './components/DataTable/DataTable';
import SaveReportForm from './components/DataTable/SaveReportForm';
import './App.css';

function App() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [data, setData] = useState({ columns: [], rows: [] });
  // other states for sorting, filtering, etc.

  //Functions to handle changes in sorting, filtering, and saving reports

  return (
    <div className="App">
      <ColumnSelector
        columns={['Column1', 'Column2']}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      <SortingFiltering
        onSortChange={/* your handler function */}
        onFilterChange={/* your handler function */}
      />
      <DataTable data={data} />
      <SaveReportForm onSave={/* your handler function */} />
    </div>
  );
}

export default App;
