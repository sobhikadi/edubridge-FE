import axiosInstance from "./AxiosInstance";

const apiUrl = "/courses";

const CourseApi = {
  getCourses: (searchValue) => {
    const { searchTerm, selectedCategory } = searchValue;
    const params = {
      searchTerm: searchTerm,
      categoryId: selectedCategory,
    };
    return axiosInstance
      .get(apiUrl, { params: params })
      .then((result) => result.data.courses);
  },
  createCourse: (data) => {
    const { title, description, provider, file, publishState, category } = data;
    const state = publishState === "published" ? "PUBLISHED" : "PENDING";
    const courseInfo = {
      title: title,
      description: description,
      provider: provider,
      publishState: state,
      categoryId: category.id,
    };

    let formData = new FormData();
    formData.append("image", file);
    formData.append("courseInfo", JSON.stringify(courseInfo));

    return axiosInstance.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateCourse: (data) => {
    const { id, title, description, provider, file, publishState, category } =
      data;
    const state = publishState === "Published" ? "PUBLISHED" : "PENDING";
    const courseInfo = {
      title: title,
      description: description,
      provider: provider,
      publishState: state,
      categoryId: category.id,
    };

    let formData = new FormData();
    formData.append("image", file);
    formData.append("courseInfo", JSON.stringify(courseInfo));

    return axiosInstance.put(`${apiUrl}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteCourse: (id) => {
    return axiosInstance.delete(`${apiUrl}/${id}`);
  },
  getCoursesStats: (filterData) => {
    console.log(filterData);
    return axiosInstance
      .get(`${apiUrl}/stats`, { params: filterData })
      .then((result) => result.data);
  },
};

export default CourseApi;
