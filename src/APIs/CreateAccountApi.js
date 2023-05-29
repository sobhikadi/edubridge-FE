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
    return axiosInstance.post(apiUrlStudent, signUpInfo).then((result) => {
      return result.data;
    });
  },

  SignUpTeacher: (data) => {
    const {
      email,
      password,
      firstName,
      lastName,
      publishName,
      countryId,
      street,
      city,
      zipCode,
    } = data;

    const signUpInfo = {
      userName: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      publishName: publishName,
      countryId: countryId,
      street: street,
      city: city,
      zipcode: zipCode,
    };
    return axiosInstance.post(apiUrlTeacher, signUpInfo).then((result) => {
      return result.data;
    });
  },
};

export default CreateAccountApi;
