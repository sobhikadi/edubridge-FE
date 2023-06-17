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
        setChartData(response);
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
    </div>
  );
}

export default AdminDashboard;
