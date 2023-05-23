import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import CoursesPage from "./Pages/CoursesPage";
import CreateCourse from "./Pages/CreateCourse";
import ControlPanelPageAdmin from "./Pages/ControlPanelPageAdmin";
import LoginPage from "./Pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./Components/AuthContext";
import ControlPanelPageStudent from "./Pages/ControlPanelPageStudent";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  const state = useContext(AuthContext);

  const navigateUserToPanelOnRole = () => {
    if (state.user.roles.includes("ADMIN")) {
      return <ControlPanelPageAdmin />;
    } else if (state.user.roles.includes("STUDENT")) {
      return <ControlPanelPageStudent />;
    }
  };

  return (
    <div className="bg-slate-900">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/createCourse" element={<CreateCourse />} />
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
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
