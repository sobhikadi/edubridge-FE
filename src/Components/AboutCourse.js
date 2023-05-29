import React from "react";

const AboutCourse = () => {
  return (
    <div className=" px-4 sm:px-6 bg-slate-600 h-fit pt-10 rounded-b-lg">
      <div className="space-y-4  mx-auto  max-w-2xl ">
        <div className="flex justify-between">
          <div className="mb-2">
            <h2 className="mb-3 sm:mb-4 text-center text-2xl underline">
              About this course
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              suscipit dolores laborum cumque recusandae et pariatur excepturi
              veniam dolorem non impedit unde ipsum ea, maiores eveniet ad ullam
              porro labore magnam vero quibusdam consectetur voluptas earum
              itaque? Dolorum voluptates dicta velit similique, soluta ipsam
              eligendi quaerat, nisi vero, necessitatibus consequatur!
            </p>
          </div>
        </div>
        <div className="pt-4 sm:pt-3 bg-slate-700 max-w-lg rounded-lg p-2 mx-auto">
          <h3 className=" text-lg mb-3">At a glance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="mb-0 pl-3 ml-1 list-disc">
              <li>
                <span className="font-bold">Institution:</span>{" "}
                <a className="text-gray-500 inline-link">EduBridge</a>
              </li>
              <li>
                <span className="font-bold">Subject: </span>{" "}
                <a
                  className="text-gray-500 inline-link"
                  href="/learn/computer-programming"
                >
                  Computer Science
                </a>
              </li>
              <li>
                <span className="font-bold">Level: </span> Introductory
              </li>
              <li>
                <span className="font-bold">Prerequisites: </span> None
              </li>
            </ul>
            <ul className="pl-3 ml-1 mb-0 list-disc">
              <li>
                <span className="font-bold">Language: </span> English
              </li>
              <li>
                <span className="font-bold">Video Transcript: </span> English
              </li>
            </ul>
          </div>
        </div>
        <div className="pb-12">
          <div className="mt-8">
            <h1 className="mb-3 sm:mb-5 text-center">What you'll learn</h1>
          </div>
          <div className="mb-2">
            <ul>
              <li>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Autem ipsa facere commodi, animi eveniet rem minima cum, ab
                  recusandae quisquam quas nobis pariatur sapiente ipsum.
                </p>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Beatae, at.
                </p>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  assumenda, incidunt corrupti enim velit ad.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;
