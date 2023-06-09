import React, { useEffect, useState } from "react";
import { AuthContext } from "../Components/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthenticationApi from "../APIs/AuthenticationApi";
import { useContext } from "react";
import NotificationContext from "../Components/NotificationContext";
import NotificationMessage from "../Components/NotificationMessage";
import ManageCoursesIcon from "../Assets/ManageCoursesIcon.svg";
import { ReactSVG } from "react-svg";
import ModalComponent from "../Components/ModalComponent";
import ChaComponentStudent from "../Components/ChatComponentStudent";
import ProfileComponent from "../Components/ProfileComponent";
import CoursesOfStudents from "../Components/CoursesOfStudents";
import StudentApi from "../APIs/StudentApi";

function ControlPanelPageStudent({ userData }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const { notification, setNotification } = useContext(NotificationContext);
  const [activeTab, setActiveTab] = useState("followedCourses");
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const getStudentDetails = () => {
    const claims = userData;
    if (claims?.roles?.includes("STUDENT") && claims?.studentId) {
      StudentApi.getStudent(claims.studentId)
        .then((student) => {
          setUserInfo(student);
          setNotification({
            message: `Welcome ${student.firstName}!`,
            type: "success",
          });
        })
        .catch((error) =>
          setNotification({
            message: error.response.data.message,
            type: "error",
          })
        );
    }
  };

  const handelActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const toggleComponents = () => {
    if (activeTab === "followedCourses") {
      return (
        <CoursesOfStudents
          courses={userInfo?.followedCourses}
          coursesType={"Followed"}
        />
      );
    } else if (activeTab === "favoriteCourses") {
      return (
        <CoursesOfStudents
          courses={userInfo?.favoriteCourses}
          coursesType={"Favourites"}
        />
      );
    } else if (activeTab === "chatWithTeacher") {
      return (
        <ChaComponentStudent
          publishName={userInfo?.firstName + userInfo?.lastName}
          role={"Student"}
          courses={userInfo?.followedCourses}
        />
      );
    } else if (activeTab === "profile") {
      return <ProfileComponent />;
    }
  };

  useEffect(() => {
    getStudentDetails();
  }, [userData]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handelLogOut = () => {
    AuthenticationApi.logout(logout);
    navigate("/");
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
      <button
        type="button"
        className="inline-flex items-center p-2 mb-3 ml-3 text-sm text-slate-200 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-slate-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className="flex min-h-screen">
        <aside
          className={`w-64 ${isSidebarOpen === true ? "block" : "hidden"} ${
            isSidebarOpen ? "fixed w-full h-[100rem] z-50 " : "md:relative"
          } transition-all duration-300 ease-in-out lg:block`}
        >
          <div className=" h-2/3 px-3 py-4 rounded-md overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    closeSidebar();
                    handelActiveTab("followedCourses");
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Followed Courses</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    closeSidebar();
                    handelActiveTab("favoriteCourses");
                  }}
                >
                  <ReactSVG
                    src={ManageCoursesIcon}
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Favorite Courses
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    closeSidebar();
                    handelActiveTab("chatWithTeacher");
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Chat with Teacher
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    closeSidebar();
                    handelActiveTab("profile");
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2  rounded-lg text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={openModal}
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-red-600 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* modal */}
        <ModalComponent
          isOpen={modalIsOpen}
          closeModal={closeModal}
          title={"Logout Modal"}
          description={"Are you sure you want to log out?"}
          onConfirm={handelLogOut}
        />
        <div className={`px-4 w-full `}>
          <div className="p-4 border-2 border-dashed rounded-lg border-gray-700 pb-10">
            {toggleComponents()}
          </div>
        </div>
      </div>
    </>
  );
}
export default ControlPanelPageStudent;
