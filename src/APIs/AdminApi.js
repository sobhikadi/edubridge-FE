import axiosInstance from "./AxiosInstance";

const apiUrl = "/admins";

const AdminApi = {
  getAdmin: (id) => {
    return axiosInstance.get(`${apiUrl}/${id}`).then((result) => result.data);
  },
  getAllAdmins: () => {
    return axiosInstance.get(`${apiUrl}`).then((result) => result.data);
  },
};

export default AdminApi;
