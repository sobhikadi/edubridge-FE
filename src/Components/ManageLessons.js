import React, { useEffect, useState } from "react";
import CreateLesson from "./CreateLesson";
import LessonsTable from "./LessonsTable";

function ManageLessons() {
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
      <CreateLesson
        onSelectedCourseChanged={getSelectedCourse}
        refreshLessons={setRefreshLessonsTrue}
      />
      <LessonsTable
        course={selectedCourse}
        refreshLesson={LessonsShouldRefresh}
        setShouldRefreshFalse={setRefreshLessonsFalse}
      />
    </div>
  );
}

export default ManageLessons;
