import React from "react";
import { useEffect, useState } from "react";
import CourseApi from "../APIs/CourseApi";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import ChartComponent from "./ChartComponent";

function AdminDashboard({ userRole, publishName }) {
  const { notification, setNotification } = useContext(NotificationContext);
  const [courses, setCourses] = useState([]);
  const searchValue = {
    searchTerm: userRole?.includes("ADMIN") ? "" : publishName,
    selectedCategory: -1,
  };
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const currentYear = new Date().getFullYear();
  const listPageSizes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100];
  const [selectedPageSize, setSelectedPageSize] = useState(10);
  const [mostFollowedCourses, setMostFollowedCourses] = useState([]);

  const [periodValue, setPeriodValue] = useState({
    startDate: new Date(Date.UTC(currentYear, 0, 1))
      .toISOString()
      .split("T")[0],
    endDate: new Date(Date.UTC(currentYear, 11, 31))
      .toISOString()
      .split("T")[0],
  });
  const [chartData, setChartData] = useState(null);

  const handlePeriodValueChange = (newValue) => {
    setPeriodValue(newValue);
  };

  const getSelectedCourse = (e) => {
    if (e?.target?.value === "Select all Courses") {
      setSelectedCourse("All Courses");
      return;
    }
    const courseTitle = e?.target?.value;
    setSelectedCourse(courses.find((course) => course.title === courseTitle));
  };

  const getSelectedCoursesAmount = (e) => {
    setSelectedPageSize(e.target.value);
  };

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
    getTopFollowedCourses();
    setNotification(null);
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const getCourseStats = () => {
    if (periodValue?.startDate === null || periodValue?.endDate === null) {
      setNotification({
        message: "Please select a date range",
        type: "error",
      });
      return;
    }
    const filterData = {
      courseId: selectedCourse === "All Courses" ? null : selectedCourse.id,
      startDate: periodValue?.startDate,
      endDate: periodValue?.endDate,
    };
    CourseApi.getCoursesStats(filterData)
      .then((response) => {
        if (response.status === 200) {
          setChartData(response.data);
        } else {
          setChartData(null);
        }

        setSelectedCourse(null);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    if (selectedCourse) {
      getCourseStats();
    }
  }, [selectedCourse, periodValue]);

  const getTopFollowedCourses = () => {
    CourseApi.getMostFollowedCourses(selectedPageSize)
      .then((response) => {
        if (response.status === 200) {
          setMostFollowedCourses(response.data);
        } else {
          setMostFollowedCourses(null);
        }
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  useEffect(() => {
    getTopFollowedCourses();
  }, [selectedPageSize]);

  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Dashboard
      </h1>
      <div>
        <div className="mb-6">
          <label
            htmlFor="course"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Course to see statistics for or select all courses
          </label>
          <select
            id="course"
            name="course"
            defaultValue=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => getSelectedCourse(e)}
            required
          >
            <option value="Select all Courses">Select all Courses</option>
            {courses.map((course) => {
              {
                if (course.publishState === "PENDING") {
                  return;
                }
              }
              return (
                <option key={course.id} value={`${course.title}`}>
                  {course.title}
                </option>
              );
            })}
          </select>
        </div>
        <Datepicker
          separator={"to"}
          value={periodValue}
          onChange={handlePeriodValueChange}
          showShortcuts={true}
        />
      </div>
      <ChartComponent period={periodValue} chartData={chartData} />
      <div className=" h-1 bg-slate-600 w-full"></div>
      <h2 className=" flex gap-2 items-center text-2xl font-bold tracking-tight my-8 text-slate-200">
        Top
        <div className=" w-20">
          <select
            id="topMostFollowed"
            name="topMostFollowed"
            defaultValue=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => getSelectedCoursesAmount(e)}
            required
          >
            {listPageSizes.map((size) => {
              return (
                <option key={size} value={`${size}`}>
                  {size}
                </option>
              );
            })}
          </select>
        </div>
        Followed Courses
      </h2>
      <div className="mt-6 mx-2 md:mx-0  grid grid-cols-1 min-[440px]:grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {mostFollowedCourses?.map(({ course, count }) => {
          if (course.publishState === "PENDING") return;
          return (
            <div key={course.id} className="group relative hover:scale-105">
              <div className="min-h-40 aspect-w-4 aspect-h-2 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none sm:h-44">
                <img
                  src={course.imageUrl}
                  alt={`image of ${course.title}`}
                  className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-slate-200">
                    <span className="cursor-pointer">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {course.title}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {count} Followers
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
