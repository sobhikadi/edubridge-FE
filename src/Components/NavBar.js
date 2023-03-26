import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import logo from "../Assets/logo.svg";
import { ReactSVG } from "react-svg";

function NavBar() {
  const navigationMain = [{ name: "Home", href: "/" }];
  const navigation = [
    { name: "Courses", href: "/courses" },
    { name: "Schools And Partners", href: "#" },
    { name: "About", href: "#" },
    { name: "Control Panel", href: "/controlPanel" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 ">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NavLink
            key={navigationMain.at("Home").name}
            to={navigationMain.at("Home").href}
            className="-m-1.5 p-1.5 text-2xl"
          >
            <ReactSVG src={logo} />
            <span className="sr-only">EduBridge</span>
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className=" text-base leading-6 text-slate-200 hover:text-indigo-400 font-semibold"
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink
            to={"#"}
            className="text-base font-semibold leading-6 text-slate-200"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </NavLink>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink
              key={navigationMain.at("Home").name}
              to={navigationMain.at("Home").href}
              className="-m-1.5 p-1.5 text-xl"
            >
              <ReactSVG src={logo} />
              <span className="sr-only">EduBridge</span>
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-200 "
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <NavLink
                  to={"#"}
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-slate-200"
                >
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default NavBar;
