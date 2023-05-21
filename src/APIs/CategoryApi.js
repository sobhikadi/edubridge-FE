import axiosInstance from "./AxiosInstance";

const apiUrl = "/categories";

const TodoApi = {
  getCategories: () => {
    return axiosInstance.get(apiUrl).then((result) => result.data.categories);
  },
  createCategory: (categoryName) => {
    categoryName = "newCategory";
    categoryName = categoryName.trim();

    return axiosInstance.post(apiUrl, categoryName);
  },
};

export default TodoApi;
