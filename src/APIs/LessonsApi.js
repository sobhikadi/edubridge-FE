import axiosInstance from "./AxiosInstance";

const apiUrl = "/lessons";

const LessonsApi = {
  getAllLessonsByCourse: (courseId) => {
    const params = {
      courseId: courseId,
    };
    return axiosInstance
      .get(apiUrl, { params: params })
      .then((result) => result.data.lessons);
  },
  createLesson: (data) => {
    const { name, description, courseId } = data;
    const lessonInfo = {
      name: name,
      description: description,
      courseId: courseId,
    };
    return axiosInstance.post(apiUrl, lessonInfo);
  },
  //   updateCourse: (data) => {
  //     const { id, title, description, provider, file, publishState, category } =
  //       data;
  //     const state = publishState === "published" ? "PUBLISHED" : "PENDING";
  //     const courseInfo = {
  //       title: title,
  //       description: description,
  //       provider: provider,
  //       publishState: state,
  //       categoryId: category.id,
  //     };

  //     let formData = new FormData();
  //     formData.append("image", file);
  //     formData.append("courseInfo", JSON.stringify(courseInfo));

  //     return axiosInstance.put(`${apiUrl}/${id}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //   },

  deleteLessonById: (lessonId, courseId) => {
    if (courseId === undefined) courseId = 0;
    return axiosInstance.delete(`${apiUrl}/${lessonId}/${courseId}`);
  },
};

export default LessonsApi;
