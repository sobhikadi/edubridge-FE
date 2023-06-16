import React, { useState, useEffect } from "react";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import NotificationMessage from "./NotificationMessage";
import StudentApi from "../APIs/StudentApi";
import TeacherApi from "../APIs/TeachersApi";

const UsersTable = () => {
  const [hoverRowIndex, setHoverRowIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  useEffect(() => {
    setNotification(null);
  }, []);

  const refreshStudents = () => {
    StudentApi.getAllStudents()
      .then((response) => {
        setUsers(response.students);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  const refreshTeachers = () => {
    TeacherApi.getAllTeachers()
      .then((response) => {
        console.log(response);
        setUsers(response.teachers);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.message,
          type: "error",
        });
      });
  };

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
    if (e.target.value === "student") {
      refreshStudents();
    } else if (e.target.value === "teacher") {
      refreshTeachers();
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    if (selectedRole === "student") {
      refreshStudents();
    } else if (selectedRole === "teacher") {
      refreshTeachers();
    } else {
      setUsers([]);
    }
    console.log(users);
  }, [selectedRole]);

  return (
    <>
      {notification && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 ">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-200">
            Users information
          </h2>
          <div className="mb-3 flex w-3/5  lg:w-2/5 xl:w-1/5 items-center pt-1 pr-1 ">
            <label
              htmlFor="userRole"
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white ml-auto"
            >
              User Role
            </label>
            <select
              id="userRole"
              name="userRole"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 md:w-3/5 ml-6 "
              value={selectedRole}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>

        {selectedRole === "student" && (
          <table className="w-full text-md text-left text-gray-400">
            <thead className="text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Followed Courses
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`${
                      index === hoverRowIndex
                        ? "bg-gray-600"
                        : index % 2 === 0
                        ? "bg-gray-900"
                        : "bg-gray-800"
                    } border-gray-700 border-b  `}
                    onMouseEnter={() => setHoverRowIndex(index)}
                    onMouseLeave={() => setHoverRowIndex(null)}
                  >
                    <td className="px-6 py-4">{student.id}</td>
                    <td className="px-6 py-4">{student.firstName}</td>
                    <td className="px-6 py-4">{student.lastName}</td>
                    <td className="px-6 py-4">{student.country?.name}</td>
                    <td className="px-6 py-4">
                      {student.followedCourses?.length}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {selectedRole === "teacher" && (
          <table className="w-full text-md text-left text-gray-400">
            <thead className="text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Publish Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Courses Published
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((teacher, index) => (
                  <tr
                    key={teacher.id}
                    className={`${
                      index === hoverRowIndex
                        ? "bg-gray-600"
                        : index % 2 === 0
                        ? "bg-gray-900"
                        : "bg-gray-800"
                    } border-gray-700 border-b  `}
                    onMouseEnter={() => setHoverRowIndex(index)}
                    onMouseLeave={() => setHoverRowIndex(null)}
                  >
                    <td className="px-6 py-4">{teacher.id}</td>
                    <td className="px-6 py-4">{teacher.firstName}</td>
                    <td className="px-6 py-4">{teacher.lastName}</td>
                    <td className="px-6 py-4">{teacher.publishName}</td>
                    <td className="px-6 py-4">
                      {teacher.address?.country?.name}
                    </td>
                    <td className="px-6 py-4">
                      {teacher.coursesCreatedBy !== null &&
                      teacher.coursesCreatedBy !== undefined
                        ? teacher.coursesCreatedBy.length
                        : 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {users.length <= 0 && (
          <table className="w-full text-md text-left text-gray-400">
            <thead className="text-sm uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-900 border-gray-700 border-b">
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
                <td className="px-6 py-4">empty</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UsersTable;
