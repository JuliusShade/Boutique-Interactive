import React, { useState, useEffect } from 'react';
import ColumnSelector from '../ColumnSelector';
import DataTable from '../DataTable';
import SaveReportForm from '../SaveReportForm';
import SortingFiltering from '../Filtering';

const ReportBuilder = () => {
    const [columns, setColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [data, setData] = useState({ columns: [], rows: [] });
    const [sortCriteria, setSortCriteria] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');

    useEffect(() => {
        const fetchColumns = async () => {
            const response = await fetch('/api/columns');
            const data = await response.json();
            setColumns(data);
        };

        fetchColumns();
    }, []);

    const handleSortChange = (value) => {
        setSortCriteria(value);
        // You can also add logic here to fetch sorted data from the backend
    };

    const handleFilterChange = (value) => {
        setFilterCriteria(value);
        // You can also add logic here to fetch filtered data from the backend
    };

    const handleSave = async (reportName) => {
        const reportData = {
            name: reportName,
            columns: selectedColumns,
            sort: sortCriteria,
            filter: filterCriteria
        };
        // You would send this to your backend to save the report configuration
        console.log('Saving report:', reportData);
    };

    // Logic to fetch data based on selected columns, sort, and filter criteria
    const fetchData = async () => {
        // Fetch logic here
    };

    // Call fetchData whenever the relevant criteria change
    useEffect(() => {
        fetchData();
    }, [selectedColumns, sortCriteria, filterCriteria]);

    return (
        <div>
            <ColumnSelector
                columns={columns}
                selectedColumns={selectedColumns}
                setSelectedColumns={setSelectedColumns}
            />
            <SortingFiltering
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
            />
            <DataTable data={data} />
            <SaveReportForm onSave={handleSave} />
        </div>
    );
};

export default ReportBuilder;
