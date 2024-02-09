import React, { useState } from 'react';

const SaveReportForm = ({ onSave }) => {
    const [reportName, setReportName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(reportName);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={reportName} 
                onChange={e => setReportName(e.target.value)} 
                placeholder="Enter report name" 
            />
            <button type="submit">Save Report</button>
        </form>
    );
};

export default SaveReportForm;
