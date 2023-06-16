import React from "react";
import { useNavigate } from "react-router-dom";
import NoResults from "./NoResults";
import CourseComponent from "./CourseComponent";

function CoursesOfStudents({ courses, coursesType }) {
  const navigate = useNavigate();
  const handelCourseClick = (course) => {
    navigate("/coursePagePublic", { state: { course: course } });
  };
  return (
    <div className=" min-h-[75vh]">
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        {coursesType === "Followed" ? "Followed Courses" : "Favorite Courses"}
      </h1>
      <div className="mt-6 mx-2 md:mx-0  grid grid-cols-1 min-[440px]:grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {!courses || courses.length === 0 ? (
          <NoResults />
        ) : coursesType === "Followed" ? (
          courses.map((course) => {
            return (
              <div key={course.course.id}>
                <CourseComponent
                  course={course.course}
                  handelCourseClick={handelCourseClick}
                />
              </div>
            );
          })
        ) : (
          courses.map((course) => {
            return (
              <div key={course.id}>
                <CourseComponent
                  course={course}
                  handelCourseClick={handelCourseClick}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CoursesOfStudents;
