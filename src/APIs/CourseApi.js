import axios from "axios";

const apiUrl = "http://localhost:8080/courses";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();

const updatedMOnth =
  currentMonth < 10 ? (currentMonth = `0${currentMonth}`) : currentMonth;
const updatedDay =
  currentDay < 10 ? (currentDay = `0${currentDay}`) : currentDay;

const fullCurrentDate = `${currentYear}-${updatedMOnth}-${updatedDay}`;
const TodoApi = {
  getCourses: () => {
    return axios.get(apiUrl).then((result) => result.data.courses);
  },
  createCourse: (data) => {
    const { courseTitle, courseDescription, courseProvider } = data;
    return axios.post(apiUrl, {
      title: `${courseTitle}`,
      description: `${courseDescription}`,
      provider: `${courseProvider}`,
      creationDate: `${fullCurrentDate}`,
      publishDate: `${fullCurrentDate}`,
      publishState: "PENDING",
    });
  },
};

export default TodoApi;
