import axiosInstance from "./AxiosInstance";

const apiUrl = "/lessons";

const LessonsApi = {
  getAllLessonsByCourse: (courseId) => {
    const params = {
      courseId: courseId,
    };
    return axiosInstance
      .get(apiUrl, { params: params })
      .then((result) => result.data.lessons);
  },
  createLesson: (data) => {
    const { name, description, courseId } = data;
    const lessonInfo = {
      name: name,
      description: description,
      courseId: courseId,
    };
    return axiosInstance.post(apiUrl, lessonInfo);
  },
  updateLesson: (data) => {
    const { id, name, description, courseName } = data;
    const lessonInfo = {
      name: name,
      description: description,
      courseName: courseName,
    };
    return axiosInstance.put(`${apiUrl}/${id}`, lessonInfo);
  },

  deleteLessonById: (lessonId, courseId) => {
    if (courseId === undefined) courseId = 0;
    return axiosInstance.delete(`${apiUrl}/${lessonId}/${courseId}`);
  },
};

export default LessonsApi;
