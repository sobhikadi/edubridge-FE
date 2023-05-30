import { useEffect, useState } from "react";
import React from "react";
import CourseApi from "../APIs/CourseApi";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import CategoryApi from "../APIs/CategoryApi";
import noImage from "../Assets/noImage.png";
import axios from "axios";

function UpdateCourse({ courseInfo, onUpdateCourse }) {
  const [course, setCourse] = useState({
    id: courseInfo?.id,
    title: courseInfo?.title,
    provider: courseInfo?.provider,
    category: courseInfo?.category,
    description: courseInfo?.description,
    publishState:
      courseInfo?.publishState === "PUBLISHED" ? "published" : "pending",
    file: courseInfo?.imageUrl,
  });

  const { notification, setNotification } = useContext(NotificationContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (courseInfo.imageUrl) {
      axios
        .get(courseInfo.imageUrl, {
          responseType: "blob",
        })
        .then((response) => {
          setCourse((prevCourse) => ({
            ...prevCourse,
            file: response.data,
          }));
        });
    }
  }, []);

  const getCategories = () => {
    CategoryApi.getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    getCategories();
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
    if (name !== "file") {
      if (name === "category") {
        setCourse((prevCourse) => ({
          ...prevCourse,
          [name]: categories.find((category) => category.name === value),
        }));
      } else {
        setCourse((prevCourse) => ({
          ...prevCourse,
          [name]: value,
        }));
      }
    } else {
      setCourse((prevCourse) => ({
        ...prevCourse,
        file: event.target.files[0],
      }));
    }
  };

  useEffect(() => {}, [course]);

  const loadImageToPreview = () => {
    if (course.file) {
      const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
      const isUrl = urlPattern.test(course.file);

      if (isUrl) {
        return course.file; // Return the URL directly if it's already a URL
      } else {
        return URL.createObjectURL(course.file); // Create a temporary URL if it's a file object
      }
    }

    return noImage;
  };

  useEffect(() => {
    loadImageToPreview();
  }, [course.file]);

  const updateCourse = (data) => {
    CourseApi.updateCourse(data)
      .then(() => {
        setNotification({
          message: `Course updated successfully.`,
          type: "success",
        });
        onUpdateCourse();
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
    updateCourse(course);
  };

  return (
    <>
      <h2 className=" text-xl font-bold tracking-tight my-4 text-slate-200">
        {`Update Course "${courseInfo?.title}"`}
      </h2>

      <div className=" p-4 bg-gray-800 rounded-lg">
        <form onSubmit={submitForm}>
          <div className=" md:flex w-full ">
            <div className="md:w-3/5 md:pr-10">
              <div className="grid gap-6 mb-6 ">
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
                    defaultValue={course.title}
                    name="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Introduction to React"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="publishState"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Publish State
                </label>
                <select
                  id="publishState"
                  name="publishState"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={course.publishState}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a State</option>
                  <option value="published">Publish</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  value={course?.category.name || ""}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
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
                  name="description"
                  defaultValue={course.description}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Introduction to React and its features"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className=" md:w-2/5 flex flex-wrap">
              <label
                htmlFor="description"
                className="text-sm font-medium mb-2 md:mb-0 text-gray-900 dark:text-white h-fit"
              >
                Course Image
              </label>
              <div className="min-h-40 aspect-w-4 aspect-h-2 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-h-2">
                <img
                  src={loadImageToPreview()}
                  alt={`Course image`}
                  className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                />
              </div>
              <div className=" flex text-slate-200 mt-3 ">
                <input type="file" name="file" onChange={handleChange} />
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

export default UpdateCourse;
