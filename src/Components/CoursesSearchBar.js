import React, { useEffect, useState } from "react";
import CategoryApi from "../APIs/CategoryApi";

function CoursesSearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [searchValue, setSearchValue] = useState({
    searchTerm: "",
    selectedCategory: null,
  });
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    CategoryApi.getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearchTermChange = (e) => {
    if (e.target.value !== "") {
      setSearchTerm(e.target.value);
    } else {
      setSearchTerm("");
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value > 0) {
      setSelectedCategory(e.target.value);
    } else {
      setSelectedCategory(-1);
    }
  };

  useEffect(() => {
    if (searchTerm !== "" || selectedCategory > 0) {
      setSearchValue({
        searchTerm: searchTerm,
        selectedCategory: selectedCategory,
      });
    } else {
      setSearchValue({
        searchTerm: "",
        selectedCategory: -1,
      });
    }
  }, [searchTerm, selectedCategory]);

  const handleSearch = () => {
    props.onChange(searchValue);
  };

  useEffect(() => {}, [searchValue]);

  return (
    <div className=" flex justify-center">
      <div className="relative w-full sm:max-w-2xl sm:mx-auto">
        <div className="overflow-hidden z-0 rounded-full relative p-[0.6rem]">
          <div role="form" className="relative flex z-50 bg-white rounded-full">
            <input
              type="text"
              placeholder="Course, provider ..."
              className="rounded-full flex-1 px-2 sm:px-6 py-4 text-indigo-900 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button
              type="submit"
              className="bg-indigo-500 text-slate-200 rounded-l-full font-semibold px-1 py-4 sm:px-6 hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
              onClick={handleSearch}
            >
              Search
            </button>

            <div className="w-px sm:w-[1.25px] h-inherit bg-black block"></div>
            <select
              className=" custom-background-menu bg-indigo-500 text-slate-200 rounded-r-full font-semibold px-2 py-4 sm:px-2 max-w-[12rem] hover:bg-indigo-600 focus:bg-indigo-600 focus:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value={-1}>Categories...</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="glow glow-1 z-10 bg-purple-400 absolute"></div>
          <div className="glow glow-2 z-20 bg-fuchsia-400 absolute"></div>
          <div className="glow glow-4 z-30 bg-indigo-400 absolute"></div>
        </div>
      </div>
    </div>
  );
}

export default CoursesSearchBar;
