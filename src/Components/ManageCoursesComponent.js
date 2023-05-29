import React from "react";
import CreateCourse from "./CreateCourse";
import CoursesTable from "./CoursesTable";

function ManageCoursesComponent({ publishName }) {
  return (
    <div>
      <CreateCourse publishName={publishName} />
      <CoursesTable />
    </div>
  );
}

export default ManageCoursesComponent;
