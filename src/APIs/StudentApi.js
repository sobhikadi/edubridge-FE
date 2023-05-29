import axiosInstance from "./AxiosInstance";

const apiUrl = "/students";
const enrollUrl = `${apiUrl}/enrollToCourse`;

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
};

export default StudentApi;
