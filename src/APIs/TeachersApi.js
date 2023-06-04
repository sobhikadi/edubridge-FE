import axiosInstance from "./AxiosInstance";

const apiUrl = "/teachers";

const TeacherApi = {
  getTeacher: (id) => {
    return axiosInstance.get(`${apiUrl}/${id}`).then((result) => result.data);
  },
  getAllTeachers: () => {
    return axiosInstance.get(apiUrl).then((result) => result.data);
  },
};

export default TeacherApi;
