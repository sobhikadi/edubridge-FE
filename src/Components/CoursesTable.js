import React, { useState, useEffect } from "react";
import CourseApi from "../APIs/CourseApi";
import ModalComponent from "./ModalComponent";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import NotificationMessage from "./NotificationMessage";
import EditCourseModal from "./EditCourseModal";

const CoursesTable = ({ refreshCourse, setShouldRefreshFalse }) => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchValue = {
    searchTerm: "",
    selectedCategory: -1,
  };
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [courseToDeleteOrEdit, setCourseToDeleteOrEdit] = useState(null);
  const { notification, setNotification } = useContext(NotificationContext);

  const setDeleteOrEditCourse = (course) => {
    setCourseToDeleteOrEdit(course);
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  useEffect(() => {
    refreshCourses();
    setShouldRefreshFalse();
  }, [refreshCourse]);

  useEffect(() => {
    setDeleteOrEditCourse(courseToDeleteOrEdit);
  }, [courseToDeleteOrEdit]);

  const openModal = () => {
    setIsModalOpen(true);
    setDeleteOrEditCourse(courses[hoverRowIndex]);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setDeleteOrEditCourse(courses[hoverRowIndex]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const refreshCourses = () => {
    CourseApi.getCourses(searchValue)
      .then((response) => {
        setCourses(response);
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
    refreshCourses();
    setNotification(null);
  }, []);

  const handleDelete = (id) => {
    if (id === null) return;
    CourseApi.deleteCourse(id)
      .then(() => {
        refreshCourses();
        setNotification({
          message: "Course deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        const errorStatus = error.response.status;
        if (errorStatus === 409) {
          setNotification({
            message: "Course cannot be deleted because it is in use",
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
      {notification && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 ">
        <h2 className="text-xl font-bold tracking-tight mb-4 text-slate-200">
          Courses
        </h2>
        <table className="w-full text-md text-left text-gray-400">
          <thead className="text-sm uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Provider
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Publish State
              </th>
              <th scope="col" className="px-6 py-3">
                Creation Date
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
            {isLoaded && courses.length === 0 && (
              <tr className="bg-gray-900 border-gray-700 border-b">
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4 text-center ">empty</td>
                <td className="px-6 py-4 text-center">empty</td>
              </tr>
            )}
            {courses.map((course, index) => (
              <tr
                key={course.id}
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
                <td className="px-6 py-4">{course.id}</td>
                <td className="px-6 py-4">{course.title}</td>
                <td className="px-6 py-4">{course.provider}</td>
                <td className="px-6 py-4">{course.category.name}</td>
                <td className="px-6 py-4">{course.publishState}</td>
                <td className="px-6 py-4">{course.creationDate}</td>
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

        <EditCourseModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          course={courseToDeleteOrEdit}
          onConfirm={refreshCourses}
        />

        <ModalComponent
          isOpen={modalIsOpen}
          closeModal={closeModal}
          title={"Delete Course"}
          description={`Are you sure you want to delete course "${courseToDeleteOrEdit?.title}"?`}
          onConfirm={() => handleDelete(courseToDeleteOrEdit?.id)}
        />
      </div>
    </>
  );
};

export default CoursesTable;
