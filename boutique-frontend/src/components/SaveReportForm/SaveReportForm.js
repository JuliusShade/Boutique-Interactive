import React, { useState } from 'react';

const SaveReportForm = ({ onSave }) => {
  const [reportName, setReportName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reportName.trim()) {
      onSave(reportName);
    } else {
      alert('Please enter a name for the report.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={reportName}
        onChange={(e) => setReportName(e.target.value)}
        placeholder="Enter report name"
        required
      />
      <button type="submit">Save Report</button>
    </form>
  );
};

export default SaveReportForm;
