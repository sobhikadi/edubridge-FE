import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthenticationApi from "../APIs/AuthenticationApi";
import { AuthContext } from "../Components/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

function LoginPage() {
  const { updateAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .max(100, "Must be 100 characters or less")
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        AuthenticationApi.login(values.userName, values.password, updateAuth)
          .then(() => {
            resetForm();
            setSubmitting(false);
          })
          .then(() => {
            navigate("/controlPanel");
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      {(formik) => (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-md text-slate-200">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-3">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block font-medium leading-6">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="userName"
                    type="text"
                    autoComplete="email"
                    {...formik.getFieldProps("userName")}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset text-black ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className="block font-sm text-red-600  leading-6">
                      {formik.errors.userName}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block font-sm leading-6">
                    Password
                  </label>
                  <div>
                    <a
                      href="#"
                      className="font-semibold text-sm text-indigo-400 hover:text-indigo-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    {...formik.getFieldProps("password")}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 text-black pl-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="block font-sm text-red-600 leading-6">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-md">
              Not a user ?
              <NavLink
                to={"/signUp"}
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-600"
              >
                Create an account now!
              </NavLink>
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default LoginPage;
