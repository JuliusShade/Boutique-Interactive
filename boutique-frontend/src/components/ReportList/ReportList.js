import React, { useState, useEffect } from 'react';

function ReportList() {
  const [reports, setReports] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Fetch reports from the backend when the component mounts and whenever reports are updated
  useEffect(() => {
    fetchReports();
  }, []);

  // Function to fetch reports from the backend
  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Check what data looks like
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (event, reportId) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, reportId]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== reportId));
    }
  };

  // Function to delete selected reports
  const deleteSelectedReports = async () => {
    try {
      const response = await fetch('/api/reports', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportIds: selectedRows }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Refresh the list of reports after deletion
      fetchReports();
      // Clear the selected rows
      setSelectedRows([]);
    } catch (error) {
      console.error('Failed to delete reports:', error);
    }
  };

  // Function to update the table with the latest data from the database
  const handleRefresh = () => {
    fetchReports();
  };

  return (
    <div>
      <h2>Reports List</h2>
      <button onClick={handleRefresh}>Refresh</button>{' '}
      {/* Button to trigger data refresh */}
      <button onClick={deleteSelectedReports}>Delete Selected Reports</button>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Report ID</th>
            <th>Report Name</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {reports.map(
            (
              report,
              index // Added `index` to use as a fallback key
            ) => (
              <tr key={report.id || index}>
                {' '}
                {/* Use report.id if available, otherwise use index */}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(report.id || index)} // Adjusted for `id` or `index`
                    onChange={(e) =>
                      handleCheckboxChange(e, report.id || index)
                    }
                  />
                </td>
                <td>{report.id || index}</td> {/* Display `id` or `index` */}
                <td>{report.report_name}</td>{' '}
                {/* Adjusted to match your data */}
                {/* Assuming you want to display `query_text` as well */}
                <td>{report.query_text}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;
