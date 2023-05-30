import { useEffect, useState } from "react";
import React from "react";
import CourseApi from "../APIs/CourseApi";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import LessonsApi from "../APIs/LessonsApi";

function CreateLesson({ onSelectedCourseChanged, refreshLessons }) {
  const [lesson, setLesson] = useState({
    name: "",
    description: "",
    courseId: 0,
  });
  const [returnedLessonId, setReturnedLessonId] = useState(0);
  const { notification, setNotification } = useContext(NotificationContext);
  const [courses, setCourses] = useState([]);
  const searchValue = {
    searchTerm: "",
    selectedCategory: -1,
  };
  const [selectedCourse, setSelectedCourse] = useState(null);

  const getSelectedCourse = (e) => {
    const courseTitle = e?.target?.value;
    setSelectedCourse(courses.find((course) => course.title === courseTitle));
  };

  useEffect(() => {
    if (selectedCourse) {
      setLesson((prevLesson) => ({
        ...prevLesson,
        courseId: selectedCourse.id,
      }));
      onSelectedCourseChanged(selectedCourse);
    }
  }, [selectedCourse]);

  const refreshCourses = () => {
    CourseApi.getCourses(searchValue)
      .then((response) => {
        setCourses(response);
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

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLesson((prevLesson) => ({
      ...prevLesson,
      [name]: value,
    }));
  };

  useEffect(() => {}, [lesson]);

  const addLesson = (data) => {
    LessonsApi.createLesson(data)
      .then((response) => {
        setReturnedLessonId(response.data.lessonId);
        refreshLessons();
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    if (returnedLessonId > 0) {
      setNotification({
        message: `Lesson created successfully with id ${returnedLessonId}`,
        type: "success",
      });
    }
  }, [returnedLessonId]);

  const submitForm = (e) => {
    e.preventDefault();
    addLesson(lesson);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div>
          <h2 className=" text-xl font-bold tracking-tight my-4 text-slate-200">
            Create a lesson
          </h2>
          <div className="mb-6">
            <label
              htmlFor="course"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Course to add lesson to
            </label>
            <select
              id="course"
              name="course"
              defaultValue=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => getSelectedCourse(e)}
              required
            >
              <option value="" disabled>
                Select a Course
              </option>
              {courses.map((course) => {
                return (
                  <option key={course.id} value={`${course.title}`}>
                    {course.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className=" p-4 bg-gray-800 rounded-lg">
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
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="introduction to C# programming"
                    onChange={handleChange}
                    required
                    minLength={3}
                    maxLength={100}
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
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="C# is a programming language developed by Microsoft..."
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={1000}
                ></textarea>
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
        </div>
      </form>
    </>
  );
}

export default CreateLesson;
