import React, { useEffect, useRef } from 'react';

const FilterBar = ({ searchTerm, onSearchChange, onFilterChange, categories, selectedCategory, onCategoryChange }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus(); // Tự động focus khi render
    }, []);

    return (
        <div className="p-4 bg-white shadow rounded-lg mb-6 w-full">
            <div className="flex gap-4 w-full">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="🔍 Search documents..."
                    value={searchTerm} // <-- Thêm dòng này
                    className="flex-1 border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => onSearchChange(e.target.value)}

                />
                <select
                    className="border border-gray-300 rounded px-4 py-2"
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Document">Document</option>
                    <option value="Exam">Exam</option>
                </select>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-1 border rounded-full ${selectedCategory === category ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default FilterBar;
