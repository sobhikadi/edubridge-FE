import React, { useState, useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";

function ManageCategories() {
  const [categoriesShouldRefresh, setCategoriesShouldRefresh] = useState(false);

  const setRefreshCategoriesTrue = () => {
    setCategoriesShouldRefresh(true);
  };

  const setRefreshCategoriesFalse = () => {
    setCategoriesShouldRefresh(false);
  };

  useEffect(() => {}, [categoriesShouldRefresh]);
  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Manage Categories
      </h1>
      <CreateCategory refreshCategories={setRefreshCategoriesTrue} />
      <CategoriesTable
        refreshCategory={categoriesShouldRefresh}
        setShouldRefreshFalse={setRefreshCategoriesFalse}
      />
    </div>
  );
}

export default ManageCategories;
