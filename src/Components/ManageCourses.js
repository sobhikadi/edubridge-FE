import React, { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import CoursesTable from "./CoursesTable";

function ManageCourses({ publishName }) {
  const [courseShouldRefresh, setCourseShouldRefresh] = useState(false);

  const setRefreshCoursesTrue = () => {
    setCourseShouldRefresh(true);
  };

  const setRefreshCoursesFalse = () => {
    setCourseShouldRefresh(false);
  };

  useEffect(() => {}, [courseShouldRefresh]);

  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Manage Courses
      </h1>
      <CreateCourse
        publishName={publishName}
        refreshLessons={setRefreshCoursesTrue}
      />
      <CoursesTable
        refreshCourse={courseShouldRefresh}
        setShouldRefreshFalse={setRefreshCoursesFalse}
      />
    </div>
  );
}

export default ManageCourses;
