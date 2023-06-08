import { render } from "@testing-library/react";
import React from "react";

function ChatUserList({ users, selectedUser, onSelectUser, userType }) {
  const renderUserType = (user) => {
    if (userType === "Teacher") {
      if (user.hasOwnProperty("publishName")) {
        return <span className="text-sm text-gray-400">Admin</span>;
      } else {
        return <span className="text-sm text-gray-400">Student</span>;
      }
    }
  };

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className={`flex flex-row py-4 px-2 justify-center gap-2 lg:gap-0 items-center text-slate-200 cursor-pointer hover:bg-gray-600 ${
              selectedUser === user && "bg-blue-500 bg-opacity-60"
            }`}
            onClick={() => onSelectUser(user)}
          >
            <div className="w-1/4 md:w-1/5">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div className=" w-3/4 md:w-4/5 pl-2 lg:pl-0">
              <div className="text-lg font-bold">
                {user.hasOwnProperty("publishName") ? (
                  <span>{user?.publishName}</span>
                ) : (
                  <span>{`${user?.firstName} ${user?.lastName}`}</span>
                )}
              </div>
              {renderUserType(user)}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-row py-4 px-2 justify-center gap-2  items-center text-slate-200 ">
          <div className=" flex justify-center items-center text-sm h-12 w-12 rounded-full bg-indigo-600">
            <span>NO</span>
          </div>
          <div className="w-3/4">
            <div className="text-lg font-semibold">No Results</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatUserList;
