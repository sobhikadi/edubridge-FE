import React, { useState } from "react";
import NoResults from "./NoResults";
import LessonComponent from "./LessonComponent";

function LessonsCourse(props) {
  const [activeStep, setActiveStep] = useState(0);
  const lessonsData = props?.lessonsData;
  const currentLesson = props.lessonsData[activeStep];

  const steps =
    lessonsData.length > 0 ? lessonsData.map((lesson) => lesson.title) : [];

  const handleNext = () =>
    setActiveStep((cur) => (cur < steps.length ? cur + 1 : cur));
  const handlePrev = () => setActiveStep((cur) => (cur > 0 ? cur - 1 : cur));

  return (
    <div className="px-4 sm:px-6 bg-slate-600 h-fit pt-10 rounded-b-lg mb-10">
      {steps.length > 0 ? (
        <div className="w-full flex lg:flex-row-reverse flex-wrap lg:flex-nowrap  justify-between min-h-full py-4 px-8">
          <div className="flex lg:flex-col h-full lg:w-1/6 md:mt-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex lg:flex-col items-center px-4 ${
                  index === steps.length - 1 ? "" : "h-[125px]"
                }`}
              >
                <div
                  className={`${
                    activeStep >= index
                      ? "bg-indigo-800 text-white"
                      : "bg-gray-200 text-gray-500"
                  } cursor-pointer p-4 rounded-full text-center`}
                  onClick={() => setActiveStep(index)}
                >
                  Lesson {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={` w-1 flex-grow transition-all duration-500 ease-in-out ${
                      activeStep > index ? "bg-indigo-800" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-grow flex-wrap items-between lg:w-5/6">
            {<LessonComponent data={currentLesson} />}

            <div className=" mb-2 mt-auto w-full text-xl px-10 flex max-h-14 justify-between">
              <button
                onClick={handlePrev}
                className={`${
                  activeStep === 0 ? "opacity-50 cursor-not-allowed" : ""
                } p-2 bg-indigo-800 text-white rounded shadow-md w-28`}
                disabled={activeStep === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`${
                  activeStep === steps.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } p-2 bg-indigo-800 text-white rounded shadow-md w-28`}
                disabled={activeStep === steps.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NoResults />
      )}
    </div>
  );
}

export default LessonsCourse;
