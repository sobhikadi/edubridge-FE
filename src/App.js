import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import CoursesPage from "./Pages/CoursesPage";
import CreateCourse from "./Pages/CreateCourse";
import ControlPanelPage from "./Pages/ControlPanelPage";
import LoginPage from "./Pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./Components/AuthContext";

function App() {
  const state = useContext(AuthContext);

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
              state.isAuthenticated ? <ControlPanelPage /> : <LoginPage />
            }
          />
          <Route
            path="/login"
            element={
              state.isAuthenticated ? <ControlPanelPage /> : <LoginPage />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
