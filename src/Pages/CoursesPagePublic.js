import React, { useState, useEffect } from "react";
import CourseApi from "../APIs/CourseApi";
import CardSkeleton from "../Components/CardSkeleton";
import NoResults from "../Components/NoResults";
import CoursesSearchBar from "../Components/CoursesSearchBar";
import { useNavigate } from "react-router-dom";

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
                    <span
                      onClick={() => handelCourseClick(course)}
                      className="cursor-pointer"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {course.title}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {course.provider}
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

export default CoursesPagePublic;
