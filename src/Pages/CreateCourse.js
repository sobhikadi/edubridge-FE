import { useEffect, useState } from "react";
import React from "react";
import CourseApi from "../APIs/CourseApi";
import Alert from "../Components/Alert";

function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseProvider, setCourseProvider] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [returnedCourseId, setReturnedCourseId] = useState(0);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const titleChanged = (e) => {
    setCourseTitle(e.target.value);
  };
  const providerChanged = (e) => {
    setCourseProvider(e.target.value);
  };
  const descriptionChanged = (e) => {
    setCourseDescription(e.target.value);
  };

  const addCourse = (data) => {
    CourseApi.createCourse(data)
      .then((response) => {
        setReturnedCourseId(response.data.courseId);
      })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
        setAlertMessage(`Error: ${error.message}`);
        setMessageColor("text-red-500");
      });
  };

  const onChangeSetAlert = () => {
    setAlert(false);
    setAlertMessage("");
  };

  useEffect(() => {
    if (returnedCourseId !== 0) {
      setAlertMessage(
        `Course has been created successfully, course id is ${returnedCourseId}`
      );
      setMessageColor("text-green-500");
      console.log(alertMessage);
      setAlert(true);
    }
  }, [returnedCourseId]);

  const submitForm = (e) => {
    e.preventDefault();
    const data = { courseTitle, courseProvider, courseDescription };
    addCourse(data);
  };
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {alertMessage !== "" && (
        <Alert
          alertMessage={alertMessage}
          messageColor={messageColor}
          onChangeSetAlert={onChangeSetAlert}
        />
      )}
      <h2 className=" text-2xl font-bold tracking-tight my-4 text-slate-200">
        Add a course
      </h2>
      <form onSubmit={submitForm}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="course_title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Course Title
            </label>
            <input
              type="text"
              id="course_title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Introduction to React"
              onChange={titleChanged}
              required
            />
          </div>
          <div>
            <label
              htmlFor="course Provider"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Course Provider
            </label>
            <input
              type="text"
              id="course_provider"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="React"
              onChange={providerChanged}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Course Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Introduction to React and its features"
            onChange={descriptionChanged}
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
