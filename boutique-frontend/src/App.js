import React, { useState } from 'react';
import ColumnSelector from './components/ColumnSelector/ColumnSelector';
import Filtering from './components/Filter/Filtering';
import DataTable from './components/DataTable/DataTable';
import SaveReportForm from './components/SaveReportForm/SaveReportForm';
import './App.css';

function App() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reportData, setReportData] = useState({ columns: [], rows: [] });
  const [sortConfig, setSortConfig] = useState({});
  const [filters, setFilters] = useState({});

  const handleFilterChange = (column, value) => {
    setFilters((currentFilters) => {
      const updatedFilters = { ...currentFilters };
      if (value) {
        updatedFilters[column] = value; // Set or update the filter value
      } else {
        delete updatedFilters[column]; // Remove the filter if the value is empty
      }
      return updatedFilters;
    });
  };

  const applyFiltersAndFetchData = () => {
    fetchReportData();
    // Call this function when filter values change or when the 'Generate Report' button is clicked
  };

  // Function to fetch the report data based on selected columns
  const fetchReportData = async () => {
    try {
      const response = await fetch('/api/boutiques/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedColumns, filters }), // Add real filter logic here
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
  const handleSaveReport = async (reportName) => {
    try {
      const response = await fetch('/api/boutiques/saveReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportName,
          selectedColumns,
          reportData: reportData.rows,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful save
      alert('Report saved successfully!');
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Failed to save the report.');
    }
  };

  console.log('App state - selectedColumns:', selectedColumns);
  return (
    <div className="App">
      <h1>Dynamic Report Builder</h1>
      <ColumnSelector
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      <Filtering
        availableColumns={selectedColumns}
        onFilterChange={handleFilterChange}
      />
      <button onClick={applyFiltersAndFetchData}>Generate Report</button>
      <DataTable data={reportData} />
      <SaveReportForm onSave={handleSaveReport} />
    </div>
  );
}

export default App;
