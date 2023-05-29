import React, { useState } from "react";

const CourseTabsComponent = ({ handleTabClick }) => {
  const [activeTab, setActiveTab] = useState("About");

  const tabs = ["About", "Lessons", "Providers", "Reviews"];

  return (
    <div className="w-full customBackground">
      <div className="relative right-0">
        <ul
          className="relative flex list-none flex-wrap rounded-lg bg-blue-gray-50/60 p-1"
          data-tabs="tabs"
          role="list"
        >
          {tabs.map((tab) => (
            <li className="z-30 flex-auto text-center" key={tab}>
              <a
                className={
                  tab === activeTab
                    ? "text-slate-200 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-slate-600 px-0 py-1 transition-all ease-in-out"
                    : "text-slate-200 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
                }
                onClick={() => {
                  setActiveTab(tab);
                  handleTabClick(tab);
                }}
                data-tab-target=""
                role="tab"
                aria-selected={tab === activeTab}
              >
                <span className="ml-1">{tab}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseTabsComponent;
