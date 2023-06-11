import axiosInstance from "./AxiosInstance";

const apiUrl = "/students";
const enrollUrl = `${apiUrl}/enrollToCourse`;
const addToFavouritesUrl = `${apiUrl}/addToFavourites`;

const StudentApi = {
  getStudent: (id) => {
    return axiosInstance.get(`${apiUrl}/${id}`).then((result) => result.data);
  },
  enrollToCourse: (studentId, courseId) => {
    return axiosInstance.post(enrollUrl, {
      studentId: studentId,
      courseId: courseId,
    });
  },
  disenrollFromCourse: (studentId, courseId) => {
    return axiosInstance.delete(`${enrollUrl}/${courseId}/${studentId}`);
  },
  addToFavourites: (studentId, courseId) => {
    return axiosInstance.post(`${addToFavouritesUrl}`, {
      studentId: studentId,
      courseId: courseId,
    });
  },
  removeFromFavourites: (studentId, courseId) => {
    return axiosInstance.delete(
      `${addToFavouritesUrl}/${courseId}/${studentId}`
    );
  },
  getAllStudents: () => {
    return axiosInstance.get(apiUrl).then((result) => result.data);
  },
  getStudentCourses: (id) => {
    return StudentApi.getStudent(id)
      .then((student) => {
        return student;
      })
      .then((student) => {
        return {
          followedCourses: student.followedCourses,
          favoriteCourses: student.favoriteCourses,
        };
      });
  },
  getStudentsByFollowedCourse: (courseId) => {
    return axiosInstance
      .get(`${apiUrl}/getStudentsByCourse/${courseId}`)
      .then((result) => result.data);
  },
};

export default StudentApi;
