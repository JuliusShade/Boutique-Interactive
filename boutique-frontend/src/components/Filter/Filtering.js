import React from 'react';

const SortingFiltering = ({ onSortChange, onFilterChange }) => {
    return (
        <div>
            <div>
                <label>Sort By: </label>
                <input type="text" onChange={e => onSortChange(e.target.value)} />
            </div>
            <div>
                <label>Filter: </label>
                <input type="text" onChange={e => onFilterChange(e.target.value)} />
            </div>
        </div>
    );
};

export default SortingFiltering;
