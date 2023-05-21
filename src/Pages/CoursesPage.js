import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CourseApi from "../APIs/CourseApi";
import CardSkeleton from "../Components/CardSkeleton";
import NoResults from "../Components/NoResults";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshCourses = () => {
    CourseApi.getCourses()
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

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className=" text-4xl font-bold tracking-tight mt-4 text-slate-200">
        Courses
      </h2>
      <p className="text-slate-200 mt-3 font-light">
        {courses.length} Results on EduBridge
      </p>

      <div className="mt-2">
        <NavLink
          className={" text-slate-400 hover:text-sky-500"}
          to={"/createCourse"}
        >
          Create courses
        </NavLink>
      </div>

      {isLoaded && courses.length === 0 && <NoResults />}

      <div className="mt-6 mx-2 md:mx-0  grid grid-cols-1 min-[440px]:grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {!isLoaded && <CardSkeleton />}
        {courses.map((course) => {
          // if (course.publishDate === null) return;
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
                    <NavLink to={"#"}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {course.title}
                    </NavLink>
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

export default CoursesPage;
