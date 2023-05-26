import axiosInstance from "./AxiosInstance";

const apiUrlStudent = "/students";
const apiUrlTeacher = "/teachers";

const CreateAccountApi = {
  SignUpStudent: (data) => {
    const { email, password, firstName, lastName, countryId } = data;

    const signUpInfo = {
      userName: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      countryId: countryId,
    };
    console.log(signUpInfo);

    return axiosInstance.post(apiUrlStudent, signUpInfo).then((result) => {
      return result.data;
    });
  },
};

export default CreateAccountApi;
