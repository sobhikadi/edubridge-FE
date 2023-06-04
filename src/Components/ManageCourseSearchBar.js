import React, { useState } from "react";
import filterIcon from "../Assets/filter-icon.png"; // import your filter icon here

const ManageCourseSearchBar = ({ handleChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterType, setFilterType] = useState("Title");

  const handleFilterSelect = (filter) => {
    setFilterType(filter);
    setShowDropdown(false);
  };

  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      handleChange(event.target.value, filterType);
    }
  };

  return (
    <div className="relative flex mb-4 items-center md:w-2/6 pt-1 pr-1 ">
      <label
        htmlFor="search_field"
        className="block text-md font-medium text-gray-900 dark:text-white md:ml-auto"
      >
        Search course:
      </label>
      <div className="relative md:ml-4 md:w-4/6">
        <input
          type="text"
          id="search_field"
          name="search_field"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`${filterType}`}
          onKeyDown={handleInputChange}
          required
        />
        <div
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-7 h-7"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={filterIcon} alt="Filter Icon" />
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleFilterSelect("Title")}
              >
                Title
              </div>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleFilterSelect("Provider")}
              >
                Provider
              </div>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleFilterSelect("PublishState")}
              >
                PublishState
              </div>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleFilterSelect("Category")}
              >
                Category
              </div>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleFilterSelect("CreationDate")}
              >
                Creation Date
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourseSearchBar;
