import React from "react";
import { useField } from "formik";

function InputFieldRegisterForm({ label, ...props }) {
  const [field, meta] = useField(props);
  const style = `relative`;
  return (
    <div className={field.classes ? field.classes : style}>
      <p
        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                            absolute"
      >
        {label}
      </p>
      <input
        {...field}
        {...props}
        placeholder={field.name}
        className="border placeholder-gray-400 focus:outline-none
  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
  border-gray-300 rounded-md"
      />
      {meta.touched && meta.error ? (
        <div className="block font-sm text-red-600 leading-6">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default InputFieldRegisterForm;
