import React, { useState, useContext, useEffect } from "react";
import signUpImage from "../Assets/signupImage.png";
import InputFieldRegisterForm from "../Components/InputFieldRegisterForm";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SelectCountryRegisterForm from "../Components/SelectCountryRegisterForm";
import CreateAccountApi from "../APIs/CreateAccountApi";
import NotificationContext from "../Components/NotificationContext";
import NotificationMessage from "../Components/NotificationMessage";

function SignUpPage() {
  const [selected, setSelected] = useState(true);

  const { notification, setNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification, setNotification]);

  const initialValuesStudent = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    countryId: 1,
  };
  const initialValuesTeacher = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipCode: "",
    countryId: 0,
  };

  const validationSchemaStudent = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    countryId: Yup.number().required("Required"),
  });

  const validationSchemaTeacher = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required"),
    countryId: Yup.number().required("Required"),
  });

  const handleRegistrationTypeClick = () => {
    setSelected(!selected);
  };

  return (
    <div className="lg:mt-4 lg:mb-4 relative">
      {notification && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div
        className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row"
      >
        <div className="flex flex-col items-center w-full pt-5 pb-20  lg:pt-10 lg:pl-10 lg:pr-10 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-8/12 lg:-ml-20 ">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-24">
              <img className=" rounded-full" src={signUpImage} alt="" />
            </div>
          </div>
          <div className=" w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-8/12">
            <div
              className="flex flex-col items-start justify-start pt-10 px-4 pb-10 lg:-mr-16  lg:px-10 bg-white shadow-2xl rounded-xl
                    relative z-10"
            >
              <p className="w-full text-indigo-600 text-4xl font-medium text-center leading-snug font-serif">
                Sign up for an account
              </p>
              <div className="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200">
                <div className="relative w-full h-full flex items-center">
                  <div
                    onClick={handleRegistrationTypeClick}
                    className="w-full flex justify-center text-gray-400 cursor-pointer"
                  >
                    <button>Student?</button>
                  </div>
                  <div
                    onClick={handleRegistrationTypeClick}
                    className="w-full flex justify-center text-gray-400 cursor-pointer"
                  >
                    <button>Teacher?</button>
                  </div>
                </div>
                <span
                  className={`bg-white shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute text-indigo-600 font-semibold ${
                    selected ? "left-1 " : "left-1/2 -ml-1"
                  }`}
                >
                  {selected ? "As Student" : "As Teacher"}
                </span>
              </div>

              {selected ? (
                //form to toggle student
                <Formik
                  initialValues={initialValuesStudent}
                  validationSchema={validationSchemaStudent}
                  onSubmit={(values, { resetForm, setSubmitting }) => {
                    CreateAccountApi.SignUpStudent(values)
                      .then((res) => {
                        resetForm();
                        setSubmitting(false);
                        setNotification({
                          message: "Account created successfully",
                          type: "success",
                        });
                      })
                      .catch((err) => {
                        console.log(err.response.data.message);
                        setNotification({
                          message: err.response.data.message,
                          type: "error",
                        });
                      });
                  }}
                >
                  <Form className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                    <InputFieldRegisterForm
                      label="Username/Email"
                      name="email"
                      type="text"
                    />
                    <InputFieldRegisterForm
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <InputFieldRegisterForm
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                    <InputFieldRegisterForm
                      label="First Name"
                      name="firstName"
                      type="text"
                    />
                    <InputFieldRegisterForm
                      label="Last Name"
                      name="lastName"
                      type="text"
                    />

                    <SelectCountryRegisterForm
                      label="Select Country"
                      name="countryId"
                    />

                    <div className="relative">
                      <button
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                                            rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Formik>
              ) : (
                //form to toggle teacher
                <Formik
                  initialValues={initialValuesTeacher}
                  validationSchema={validationSchemaTeacher}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  <Form className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                    <InputFieldRegisterForm
                      label="Username/Email"
                      name="email"
                      type="text"
                    />
                    <InputFieldRegisterForm
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <InputFieldRegisterForm
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                    <InputFieldRegisterForm
                      name="firstName"
                      label="First Name"
                      type="text"
                    />
                    <InputFieldRegisterForm
                      label="Last Name"
                      name="lastName"
                      type="text"
                    />

                    <InputFieldRegisterForm
                      label="Street"
                      name="street"
                      type="text"
                    />

                    <div className="relative w-full flex flex-wrap md:flex-nowrap gap-5">
                      <InputFieldRegisterForm
                        label="City"
                        name="city"
                        type="text"
                        className="w-full md:w-1/2"
                      />
                      <InputFieldRegisterForm
                        label="ZipCode"
                        name="zipCode"
                        type="text"
                        className="w-full md:w-1/2"
                      />
                    </div>

                    <SelectCountryRegisterForm
                      label="Select Country"
                      name="countryId"
                    />
                    <div className="relative">
                      <button
                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                                            rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Formik>
              )}
            </div>

            <svg
              viewBox="0 0 91 91"
              className="absolute top-0 left-0 z-0 w-32 h-32 -mt-[25px] -ml-[25px] text-yellow-300
                    fill-current"
            >
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="3.006" r="2.72" />
                      <circle cx="15.296" cy="3.006" r="2.719" />
                      <circle cx="27.333" cy="3.006" r="2.72" />
                      <circle cx="39.369" cy="3.006" r="2.72" />
                      <circle cx="51.405" cy="3.006" r="2.72" />
                      <circle cx="63.441" cy="3.006" r="2.72" />
                      <circle cx="75.479" cy="3.006" r="2.72" />
                      <circle cx="87.514" cy="3.006" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <svg
              viewBox="0 0 91 91"
              className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-[60px] -mr-[60px] lg:-mr-[125px] text-indigo-500
                    fill-current"
            >
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="3.006" r="2.72" />
                      <circle cx="15.296" cy="3.006" r="2.719" />
                      <circle cx="27.333" cy="3.006" r="2.72" />
                      <circle cx="39.369" cy="3.006" r="2.72" />
                      <circle cx="51.405" cy="3.006" r="2.72" />
                      <circle cx="63.441" cy="3.006" r="2.72" />
                      <circle cx="75.479" cy="3.006" r="2.72" />
                      <circle cx="87.514" cy="3.006" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
