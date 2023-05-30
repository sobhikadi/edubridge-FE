import React, { useState, useEffect } from "react";
import ModalComponent from "./ModalComponent";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import NotificationMessage from "./NotificationMessage";
import EditLessonsModal from "./EditLessonModal";
import LessonsApi from "../APIs/LessonsApi";

const LessonsTable = ({ course, refreshLesson, setShouldRefreshFalse }) => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [lessonToDeleteOrEdit, setLessonToDeleteOrEdit] = useState(null);
  const { notification, setNotification } = useContext(NotificationContext);

  const setDeleteOrEditLesson = (lesson) => {
    setLessonToDeleteOrEdit(lesson);
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  useEffect(() => {
    setDeleteOrEditLesson(lessonToDeleteOrEdit);
  }, [lessonToDeleteOrEdit]);

  const openModal = () => {
    setIsModalOpen(true);
    setDeleteOrEditLesson(lessons[hoverRowIndex]);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setDeleteOrEditLesson(lessons[hoverRowIndex]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const refreshLessons = () => {
    LessonsApi.getAllLessonsByCourse(course?.id)
      .then((response) => {
        setLessons(response);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    refreshLessons();
    setShouldRefreshFalse();
  }, [refreshLesson]);

  useEffect(() => {
    refreshLessons();
  }, [course]);

  const handleDelete = (id) => {
    if (id === null) return;
    LessonsApi.deleteLessonById(id)
      .then(() => {
        refreshLessons();
        setNotification({
          message: "Lesson deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        const errorStatus = error.response.status;
        if (errorStatus === 409) {
          setNotification({
            message: "Lesson cannot be deleted because it is in use",
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
          Courses
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
            {course === null || lessons.length === 0 ? (
              <tr className="bg-gray-900 border-gray-700 border-b">
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4 text-center ">empty</td>
                <td className="px-6 py-4 text-center">empty</td>
              </tr>
            ) : (
              lessons?.map((lesson, index) => (
                <tr
                  key={lesson.id}
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
                  <td className="px-6 py-4">{lesson.id}</td>
                  <td className="px-6 py-4">{lesson.name}</td>
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
              ))
            )}
          </tbody>
        </table>

        <EditLessonsModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          course={lessonToDeleteOrEdit}
          onConfirm={refreshLessons}
        />

        <ModalComponent
          isOpen={modalIsOpen}
          closeModal={closeModal}
          title={"Delete Lesson"}
          description={`Are you sure you want to delete lesson "${lessonToDeleteOrEdit?.name}"?`}
          onConfirm={() => handleDelete(lessonToDeleteOrEdit?.id)}
        />
      </div>
    </>
  );
};

export default LessonsTable;
