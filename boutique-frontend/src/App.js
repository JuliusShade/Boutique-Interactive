import React, { useState } from 'react';
import ColumnSelector from './components/ColumnSelector/ColumnSelector';
import SortingFiltering from './components/Filter/Filtering';
import DataTable from './components/DataTable/DataTable';
import SaveReportForm from './components/DataTable/SaveReportForm';
import './App.css';

function App() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reportData, setReportData] = useState({ columns: [], rows: [] });

  // Function to fetch the report data based on selected columns
  const fetchReportData = async () => {
    // This would be your actual API call to fetch the report data
    // For demonstration, it's a placeholder function
    console.log('Fetching report data for columns: ', selectedColumns);
    // Placeholder data
    setReportData({
      columns: selectedColumns,
      rows: [
        // This would be the actual data fetched from the backend
      ],
    });
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
      // Pass the necessary props or callbacks for sorting and filtering
      />
      <button onClick={fetchReportData}>Generate Report</button>
      <DataTable data={reportData} />
      <SaveReportForm onSave={handleSaveReport} />
    </div>
  );
}

export default App;
