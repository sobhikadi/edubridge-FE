import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import CoursesPage from "./Pages/CoursesPage";
import CreateCourse from "./Pages/CreateCourse";

function App() {
  return (
    <div className="bg-slate-900">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/createCourse" element={<CreateCourse />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
