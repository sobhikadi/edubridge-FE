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
    const { courseTitle, courseDescription, courseProvider, file } = data;

    const courseInfo = {
      title: courseTitle,
      description: courseDescription,
      provider: courseProvider,
      categoryId: 4,
      publishState: "PUBLISHED",
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
};

export default CourseApi;
