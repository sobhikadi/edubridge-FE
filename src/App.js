import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import CoursesPagePublic from "./Pages/CoursesPagePublic";
import ControlPanelPageAdmin from "./Pages/ControlPanelPageAdmin";
import LoginPage from "./Pages/LoginPage";
import { useContext, useState } from "react";
import { AuthContext } from "./Components/AuthContext";
import ControlPanelPageStudent from "./Pages/ControlPanelPageStudent";
import SignUpPage from "./Pages/SignUpPage";
import NotificationContext from "./Components/NotificationContext";
import ControlPanelPageTeacher from "./Pages/ControlPanelPageTeacher";
import ControlPanelPageStudentTeacher from "./Pages/ControlPanelPageStudentTeacher";
import CoursePagePublic from "./Pages/CoursePagePublic";
import AboutPage from "./Pages/AboutPage";

function App() {
  const state = useContext(AuthContext);
  const [notification, setNotification] = useState(null);

  const navigateUserToPanelOnRole = () => {
    if (state.user.roles.includes("ADMIN")) {
      return <ControlPanelPageAdmin userData={state.user} />;
    } else if (state.user.roles.includes("STUDENT")) {
      return <ControlPanelPageStudent userData={state.user} />;
    } else if (state.user.roles.includes("TEACHER")) {
      return <ControlPanelPageTeacher userData={state.user} />;
    } else if (
      state.user.roles.includes("STUDENT") &&
      state.user.roles.includes("TEACHER")
    ) {
      return <ControlPanelPageStudentTeacher userData={state.user} />;
    }
  };

  return (
    <div className="bg-slate-900">
      <Router>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coursesPagePublic" element={<CoursesPagePublic />} />
            <Route path="/coursePagePublic" element={<CoursePagePublic />} />
            <Route
              path="/controlPanel"
              element={
                state.isAuthenticated ? (
                  navigateUserToPanelOnRole()
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/login"
              element={
                state.isAuthenticated ? (
                  navigateUserToPanelOnRole()
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </NotificationContext.Provider>
      </Router>
    </div>
  );
}

export default App;
