import React, { useRef, useState } from "react";
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
import favouritesIcon from "../Assets/favouriteIcon.png";
import alreadyFavoriteIcon from "../Assets/favorite.png";

function CoursePagePublic() {
  const location = useLocation();
  const course = location.state.course;
  const tabs = ["About", "Lessons", "Providers", "Reviews"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const state = useContext(AuthContext);
  const [studentsCourses, setStudentsCourses] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const getStudentsCourses = () => {
    if (state?.isAuthenticated && state?.user?.roles.includes("STUDENT")) {
      StudentApi.getStudentCourses(state?.user?.studentId)
        .then((response) => {
          setStudentsCourses(response);
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    }
  };

  useEffect(() => {
    getStudentsCourses();
  }, [state.isAuthenticated, course]);

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
          getStudentsCourses();
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

  const handelDisenrollFromCourse = () => {
    if (state.isAuthenticated && state.user.roles.includes("STUDENT")) {
      StudentApi.disenrollFromCourse(state.user.studentId, course.id)
        .then((response) => {
          if (response.status === 200) {
            setNotification({
              message: "Disenrolled from course",
              type: "success",
            });
          }
          getStudentsCourses();
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    } else {
      setNotification({
        message:
          "You must be logged in as a student to disenroll from a course",
        type: "error",
      });
    }
  };

  const handelAddToFavourites = () => {
    if (state.isAuthenticated && state.user.roles.includes("STUDENT")) {
      StudentApi.addToFavourites(state.user.studentId, course.id)
        .then((response) => {
          if (response.status === 200) {
            setNotification({
              message: "Added to favourites",
              type: "success",
            });
          }
          getStudentsCourses();
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    } else {
      setNotification({
        message: "You must be logged in as a student to add to favourites",
        type: "error",
      });
    }
  };

  const handelRemoveFromFavourites = () => {
    if (state.isAuthenticated && state.user.roles.includes("STUDENT")) {
      StudentApi.removeFromFavourites(state.user.studentId, course.id)
        .then((response) => {
          if (response.status === 200) {
            setNotification({
              message: "Removed from favourites",
              type: "success",
            });
          }
          getStudentsCourses();
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.message,
            type: "error",
          });
        });
    } else {
      setNotification({
        message: "You must be logged in as a student to remove from favourites",
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

  const checkIfCourseIsFollowed = (studentsCourses, course) => {
    const followedCourse = studentsCourses?.followedCourses?.find(
      (followedCourse) => followedCourse.course.id === course.id
    );
    if (followedCourse) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  };

  const checkIfCourseIsFavorite = (studentsCourses, course) => {
    const favCourse = studentsCourses?.favoriteCourses?.find(
      (favCourse) => favCourse.id === course.id
    );
    if (favCourse) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkIfCourseIsFollowed(studentsCourses, course);
    checkIfCourseIsFavorite(studentsCourses, course);
  }, [studentsCourses, course]);

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
            <div className="mt-10 flex gap-6 ">
              {isFollowed ? (
                <button
                  className="rounded-md w-56 bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handelDisenrollFromCourse}
                >
                  Cancel Enrollment?
                </button>
              ) : (
                <button
                  className="rounded-md w-56 bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handelEnrollToCourse}
                >
                  Enroll Now
                </button>
              )}

              {isFavorite ? (
                <button
                  className="rounded-md w-14 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handelRemoveFromFavourites}
                >
                  <img src={alreadyFavoriteIcon} alt="" />
                </button>
              ) : (
                <button
                  className="rounded-md w-14 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handelAddToFavourites}
                >
                  <img src={favouritesIcon} alt="" />
                </button>
              )}
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
