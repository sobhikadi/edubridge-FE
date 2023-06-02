import { useEffect, useState } from "react";
import React from "react";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import LessonsApi from "../APIs/LessonsApi";

function UpdateLesson({ lessonInfo, courseInfo, onUpdateLesson }) {
  const [lesson, setLesson] = useState({
    id: lessonInfo?.id,
    name: lessonInfo?.name,
    description: lessonInfo?.description,
    courseName: courseInfo?.title,
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
    setLesson((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  useEffect(() => {}, [lesson]);

  const submitForm = (e) => {
    e.preventDefault();
    updateLesson(lesson);
  };

  const updateLesson = (data) => {
    LessonsApi.updateLesson(data)
      .then(() => {
        setNotification({
          message: `Lesson updated successfully.`,
          type: "success",
        });
        onUpdateLesson();
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  return (
    <>
      <h2 className=" text-xl font-bold tracking-tight my-4 text-slate-200">
        {`Update lesson "${lessonInfo?.name}"`}
      </h2>

      <div className=" p-4 bg-gray-800 rounded-lg">
        <form onSubmit={submitForm}>
          <div className=" md:flex w-full ">
            <div className="w-full">
              <div className="grid gap-6 mb-6 ">
                <div>
                  <label
                    htmlFor="lesson_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lesson Name
                  </label>
                  <input
                    type="text"
                    id="lesson_name"
                    defaultValue={lesson.name}
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Introduction to React"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lesson Description
                </label>
                <textarea
                  id="description"
                  rows="6"
                  name="description"
                  defaultValue={lesson.description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="grid gap-6 mb-6 ">
                <div>
                  <label
                    htmlFor="course_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="course_name"
                    defaultValue={lesson.courseName}
                    name="courseName"
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

export default UpdateLesson;
