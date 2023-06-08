import React, { useEffect } from "react";

function CourseComponent({ course, handelCourseClick }) {
  return (
    <div className="group relative hover:scale-105">
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
          <p className="mt-1 text-sm text-gray-400">{course.provider}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseComponent;
