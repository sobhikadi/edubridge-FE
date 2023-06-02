import { useEffect, useState } from "react";
import React from "react";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import CategoryApi from "../APIs/CategoryApi";

function UpdateCategory({ categoryInfo, onUpdateCategory }) {
  const [category, setCategory] = useState({
    id: categoryInfo?.id,
    name: categoryInfo?.name,
  });

  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  useEffect(() => {}, [category]);

  const updateCategory = (data) => {
    CategoryApi.updateCategory(data.id, data.name)
      .then(() => {
        setNotification({
          message: `Category updated successfully.`,
          type: "success",
        });
        onUpdateCategory();
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    updateCategory(category);
  };

  return (
    <>
      <h2 className=" text-xl font-bold tracking-tight my-4 text-slate-200">
        {`Update Category "${categoryInfo?.name}"`}
      </h2>

      <div className=" p-4 bg-gray-800 rounded-lg">
        <form onSubmit={submitForm}>
          <div className=" md:flex w-full ">
            <div className="w-full">
              <div className="grid gap-6 mb-6 ">
                <div>
                  <label
                    htmlFor="category_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="category_name"
                    defaultValue={category.name}
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-2/5 lg:w-1/5  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:ml-auto mt-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateCategory;
