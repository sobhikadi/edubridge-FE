import React, { useEffect, useState } from "react";
import CreateLesson from "./CreateLesson";
import LessonsTable from "./LessonsTable";

function ManageLessons({ userRole, publishName }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [LessonsShouldRefresh, setLessonsShouldRefresh] = useState(false);

  const getSelectedCourse = (course) => {
    setSelectedCourse(course);
  };

  const setRefreshLessonsTrue = () => {
    setLessonsShouldRefresh(true);
  };

  const setRefreshLessonsFalse = () => {
    setLessonsShouldRefresh(false);
  };

  useEffect(() => {}, [LessonsShouldRefresh]);

  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Manage lessons
      </h1>
      <CreateLesson
        onSelectedCourseChanged={getSelectedCourse}
        refreshLessons={setRefreshLessonsTrue}
        publishName={publishName}
        userRole={userRole}
      />
      <LessonsTable
        course={selectedCourse}
        refreshLesson={LessonsShouldRefresh}
        setShouldRefreshFalse={setRefreshLessonsFalse}
        userRole={userRole}
      />
    </div>
  );
}

export default ManageLessons;
