import axiosInstance from "./AxiosInstance";

const apiUrl = "/students";

const StudentApi = {
  getStudent: (id) => {
    return axiosInstance.get(`${apiUrl}/${id}`).then((result) => result.data);
  },
};

export default StudentApi;
