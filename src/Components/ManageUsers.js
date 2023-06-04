import React from "react";
import UsersTable from "./UsersTable";

function ManageCourses() {
  return (
    <div>
      <h1 className=" text-4xl font-bold tracking-tight mb-8 text-slate-200">
        Users
      </h1>
      <UsersTable />
    </div>
  );
}

export default ManageCourses;
