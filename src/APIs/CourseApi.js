import axios from "axios";

const apiUrl = "http://localhost:8080/courses";

const TodoApi = {
  getCourses: () => {
    return axios.get(apiUrl).then((result) => result.data.courses);
  },
  createCourse: (data) => {
    const { courseTitle, courseDescription, courseProvider, file } = data;

    const courseInfo = {
      title: courseTitle,
      description: courseDescription,
      provider: courseProvider,
      categoryId: 1,
      publishState: "PUBLISHED",
    };

    let formData = new FormData();
    formData.append("image", file);
    formData.append("courseInfo", JSON.stringify(courseInfo));

    return axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default TodoApi;
