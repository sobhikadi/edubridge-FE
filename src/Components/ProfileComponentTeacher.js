import React from "react";

function ProfileComponentTeacher({ userInfo, userData }) {
  return (
    <div className="flex flex-col w-full rounded mx-auto p-2 md:p-6 lg:p-16">
      <div className="flex w-full flex-col md:flex-row rounded min-h-[35rem] overflow-hidden shadow-md shadow-slate-500">
        <div className="flex items-center w-full justify-center min-h-max md:w-3/12 text-white text-center bg-gradient-to-r from-indigo-800 to-pink-900">
          <div className="px-6 py-4">
            <div className="mb-8">
              <img
                className="w-24 h-24 rounded-full mx-auto"
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                alt="User-Profile-Image"
              />
            </div>
            <div className="font-bold text-xl mb-2">{`${userInfo?.firstName} ${userInfo?.lastName}`}</div>
          </div>
        </div>
        <div className="px-8 py-6 w-full md:w-9/12 bg-gray-800 text-white flex flex-col">
          <div className="font-bold text-xl mb-2 border-b text-indigo-500 border-gray-200 pb-2">
            Account Information
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Email</p>
              <p className="text-gray-400">{userData?.sub}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Password</p>
              <p className="text-gray-400">In future update</p>
            </div>
          </div>
          <div className="font-bold text-xl mb-2 border-b text-indigo-500 border-gray-200 pb-2">
            Personal Information
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">First Name</p>
              <p className="text-gray-400">{userInfo?.firstName}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Last Name</p>
              <p className="text-gray-400">{userInfo?.lastName}</p>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Publish Name</p>
              <p className="text-gray-400">{userInfo?.publishName}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Courses Created By</p>
              <p className="text-gray-400">
                {userInfo?.coursesCreatedBy?.length}
              </p>
            </div>
          </div>
          <div className="font-bold text-xl mb-2 border-b text-indigo-500 border-gray-200 pb-2">
            Address Information
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Country</p>
              <p className="text-gray-400">{userInfo?.address?.country.name}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">City</p>
              <p className="text-gray-400">{userInfo?.address.city}</p>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Street</p>
              <p className="text-gray-400">{userInfo?.address.street}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <p className="font-bold mb-2">Zipcode</p>
              <p className="text-gray-400">{userInfo?.address.zipCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponentTeacher;
