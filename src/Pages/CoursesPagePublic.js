import React, { useState, useEffect } from "react";
import CourseApi from "../APIs/CourseApi";
import CardSkeleton from "../Components/CardSkeleton";
import NoResults from "../Components/NoResults";
import CoursesSearchBar from "../Components/CoursesSearchBar";
import { useNavigate } from "react-router-dom";
import CourseComponent from "../Components/CourseComponent";

function CoursesPagePublic() {
  const [courses, setCourses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState({
    searchTerm: "",
    selectedCategory: -1,
  });
  const navigate = useNavigate();

  const handelCourseClick = (course) => {
    navigate("/coursePagePublic", { state: { course: course } });
  };

  const handleSearchValueChange = (searchValue) => {
    setSearchValue(searchValue);
  };

  const refreshCourses = () => {
    CourseApi.getCourses(searchValue)
      .then((response) => {
        setCourses(response);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  useEffect(() => {
    refreshCourses();
  }, [searchValue]);

  const publishedCoursesCount = courses.filter(
    (course) => course.publishState === "PUBLISHED"
  ).length;

  return (
    <div className="mx-auto max-w-2xl pt-5 pb-16 px-4 sm:pb-24 sm:pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
      <div>
        <CoursesSearchBar onChange={handleSearchValueChange} />
      </div>

      <h2 className=" text-4xl font-bold tracking-tight sm:mt-8 text-slate-200">
        Courses
      </h2>
      <p className="text-slate-200 mt-3 font-light">
        {publishedCoursesCount} Results on EduBridge
      </p>

      {isLoaded && publishedCoursesCount <= 0 && <NoResults />}

      <div className="mt-6 mx-2 md:mx-0  grid grid-cols-1 min-[440px]:grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {!isLoaded && <CardSkeleton />}
        {courses.map((course) => {
          if (course.publishState === "PENDING") return;
          return (
            <div key={course.id}>
              <CourseComponent
                course={course}
                handelCourseClick={handelCourseClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursesPagePublic;
