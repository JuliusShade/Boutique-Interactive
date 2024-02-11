import React, { useState } from 'react';
import ColumnSelector from './components/ColumnSelector/ColumnSelector';
import SortingFiltering from './components/Filter/Filtering';
import DataTable from './components/DataTable/DataTable';
import SaveReportForm from './components/DataTable/SaveReportForm';
import './App.css';

function App() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reportData, setReportData] = useState({ columns: [], rows: [] });
  const [sortConfig, setSortConfig] = useState({});
  const [filters, setFilters] = useState({});

  const handleSortChange = (sortKey) => {
    setSortConfig({ ...sortConfig, sortKey });
  };

  const handleFilterChange = (filterKey, filterValue) => {
    setFilters({ ...filters, [filterKey]: filterValue });
  };

  // Function to fetch the report data based on selected columns
  const fetchReportData = async () => {
    try {
      const response = await fetch('/api/boutiques/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedColumns, filters: {} }), // Add real filter logic here
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReportData({
        columns: selectedColumns,
        rows: data,
      });
    } catch (error) {
      console.error('Failed to fetch report data:', error);
    }
  };

  // Handle the save report form submission
  const handleSaveReport = (reportName) => {
    // You would save the report to the backend here
    console.log('Saving report:', reportName, selectedColumns);
  };

  console.log('App state - selectedColumns:', selectedColumns);
  return (
    <div className="App">
      <h1>Dynamic Report Builder</h1>
      <ColumnSelector
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      <SortingFiltering
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      <button onClick={fetchReportData}>Generate Report</button>
      <DataTable data={reportData} />
      <SaveReportForm onSave={handleSaveReport} />
    </div>
  );
}

export default App;
