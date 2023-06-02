import axiosInstance from "./AxiosInstance";

const apiUrl = "/categories";

const CategoryApi = {
  getCategories: () => {
    return axiosInstance.get(apiUrl).then((result) => result.data.categories);
  },
  createCategory: (categoryName) => {
    return axiosInstance.post(apiUrl, categoryName);
  },
  deleteCategory: (categoryId) => {
    return axiosInstance.delete(`${apiUrl}/${categoryId}`);
  },
  updateCategory: (id, name) => {
    return axiosInstance.put(`${apiUrl}/${id}`, { name });
  },
};

export default CategoryApi;
