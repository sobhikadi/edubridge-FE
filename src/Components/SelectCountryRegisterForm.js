import { useField } from "formik";
import React, { useEffect, useState } from "react";
import CountriesApi from "../APIs/CountriesApi";

function SelectCountryRegisterForm({ label, ...props }) {
  const [field, meta] = useField(props);
  const [countries, setCountries] = useState([]);
  const getAllCountries = () => {
    CountriesApi.getCountries()
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCountries();
  }, []);
  return (
    <div className="relative">
      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
        {label}
      </p>
      <select
        {...field}
        {...props}
        className="border placeholder-gray-400 focus:outline-none
          focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
          border-gray-300 rounded-md"
      >
        {countries.map((country) => {
          return (
            <option
              value={country.id}
              key={country.id}
            >{`[${country.code}] - ${country.name}`}</option>
          );
        })}
      </select>
      {meta.touched && meta.error ? (
        <div className="block font-sm text-red-600 leading-6">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default SelectCountryRegisterForm;
