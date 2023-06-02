import React, { useState, useEffect } from "react";
import ModalComponent from "./ModalComponent";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import CategoryApi from "../APIs/CategoryApi";
import EditCategoryModal from "./EditCategoryModal";

const CategoriesTable = ({ refreshCategory, setShouldRefreshFalse }) => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToDeleteOrEdit, setCategoryToDeleteOrEdit] = useState(null);
  const { notification, setNotification } = useContext(NotificationContext);

  const setDeleteOrEditCategory = (course) => {
    setCategoryToDeleteOrEdit(course);
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  useEffect(() => {
    refreshCategories();
    setShouldRefreshFalse();
  }, [refreshCategory]);

  useEffect(() => {
    setDeleteOrEditCategory(categoryToDeleteOrEdit);
  }, [categoryToDeleteOrEdit]);

  const openModal = () => {
    setIsModalOpen(true);
    setDeleteOrEditCategory(categories[hoverRowIndex]);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setDeleteOrEditCategory(categories[hoverRowIndex]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const refreshCategories = () => {
    CategoryApi.getCategories()
      .then((response) => {
        setCategories(response);
        setIsLoaded(true);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    refreshCategories();
    setNotification(null);
  }, []);

  const handleDelete = (id) => {
    if (id === null) return;
    CategoryApi.deleteCategory(id)
      .then(() => {
        refreshCategories();
        setNotification({
          message: "Category deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        const errorStatus = error.response.status;
        if (errorStatus === 409) {
          setNotification({
            message: "Category cannot be deleted because it is in use",
            type: "error",
          });
        } else {
          setNotification({
            message:
              "Something went wrong, please try again later or contact support",
            type: "error",
          });
        }
      });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 ">
        <h2 className="text-xl font-bold tracking-tight mb-4 text-slate-200">
          Categories
        </h2>
        <table className="w-full text-md text-left text-gray-400">
          <thead className="text-sm uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Edit Action
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Delete Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoaded && categories.length === 0 && (
              <tr className="bg-gray-900 border-gray-700 border-b">
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4 text-center ">empty</td>
                <td className="px-6 py-4 text-center">empty</td>
              </tr>
            )}
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`${
                  index === hoverRowIndex
                    ? "bg-gray-600"
                    : index % 2 === 0
                    ? "bg-gray-900"
                    : "bg-gray-800"
                } border-gray-700 border-b  `}
                onMouseEnter={() => setHoverRowIndex(index)}
                onMouseLeave={() => setHoverRowIndex(null)}
              >
                <td className="px-6 py-4">{category.id}</td>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4 text-center ">
                  <a
                    href="#"
                    className="font-medium text-blue-500 hover:underline"
                    onClick={openEditModal}
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={openModal}
                    className="font-medium text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <EditCategoryModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          category={categoryToDeleteOrEdit}
          onConfirm={refreshCategories}
        />

        <ModalComponent
          isOpen={modalIsOpen}
          closeModal={closeModal}
          title={"Delete Category"}
          description={`Are you sure you want to delete category "${categoryToDeleteOrEdit?.name}"?`}
          onConfirm={() => handleDelete(categoryToDeleteOrEdit?.id)}
        />
      </div>
    </>
  );
};

export default CategoriesTable;
