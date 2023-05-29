import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CourseTabsComponent from "../Components/CourseTabsComponent";
import AboutCourse from "../Components/AboutCourse";
import LessonsCourse from "../Components/LessonsCourse";
import ProvidersCourse from "../Components/ProvidersCourse";
import ReviewsCourse from "../Components/ReviewsCourse";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthContext";
import { useEffect } from "react";
import NotificationContext from "../Components/NotificationContext";
import NotificationMessage from "../Components/NotificationMessage";
import StudentApi from "../APIs/StudentApi";

function CoursePagePublic() {
  const location = useLocation();
  const course = location.state.course;
  const tabs = ["About", "Lessons", "Providers", "Reviews"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const state = useContext(AuthContext);

  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const handelEnrollToCourse = () => {
    if (state.isAuthenticated && state.user.roles.includes("STUDENT")) {
      StudentApi.enrollToCourse(state.user.studentId, course.id)
        .then((response) => {
          if (response.status === 200) {
            setNotification({
              message: "Enrolled to course",
              type: "success",
            });
          }
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    } else {
      setNotification({
        message: "You must be logged in as a student to enroll to a course",
        type: "error",
      });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleTabChange = () => {
    if (activeTab === tabs[0]) {
      return <AboutCourse />;
    } else if (activeTab === tabs[1]) {
      return <LessonsCourse lessonsData={course.lessons} />;
    } else if (activeTab === tabs[2]) {
      return <ProvidersCourse />;
    } else if (activeTab === tabs[3]) {
      return <ReviewsCourse />;
    }
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
      <div className="mx-auto lg:max-w-7xl mt-4 text-slate-200">
        <div className="flex flex-wrap justify-between h-fit md:h-1/4 lg:h-2/6 xl:h-2/5 customBackground p-4 lg:rounded-t-xl">
          <div className=" m-2 mb-8 md:pt-6 lg:pl-14 lg:pt-14 md:w-1/2">
            <h1 className="text-4xl font-bold ">{course.title}</h1>
            <p className="mt-4">
              {course.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Tempora, error.
            </p>
            <div className="mt-10 ">
              <button
                className="rounded-md w-56 bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handelEnrollToCourse}
              >
                Enroll Now
              </button>
            </div>
          </div>
          <img
            src={`${course.imageUrl}`}
            alt=""
            className=" w-full md:w-2/5  rounded-xl"
          />
        </div>
        <CourseTabsComponent handleTabClick={handleTabClick} />
        {toggleTabChange()}
      </div>
    </>
  );
}

export default CoursePagePublic;
