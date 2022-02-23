import { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useAuth } from "../hooks/useAuth";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const auth = useAuth();

  const logout = () => auth.signOut();

  return (
    <Popover className="relative bg-[#081e39]">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <NavLink to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-white.svg"
                alt=""
              />
            </NavLink>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff8215]">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6 text-[#ff8215]" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base font-medium ${
                  isActive
                    ? "text-[#ff8215] "
                    : "text-white hover:text-[#ff8215]"
                }`
              }
            >
              Assets
            </NavLink>
            {auth.user.name && (
              <NavLink
                to="/trade"
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive
                      ? "text-[#ff8215] "
                      : "text-white hover:text-[#ff8215]"
                  }`
                }
              >
                Trade
              </NavLink>
            )}
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <span
              {...(!auth.user.name && { onClick: openModal })}
              className="cursor-pointer whitespace-nowrap text-base font-medium text-white hover:text-[#ff8215]"
            >
              {auth.user.name || "Log in"}
            </span>
          </div>
          {auth.user.name && (
            <div
              onClick={logout}
              className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
            >
              <span className="cursor-pointer whitespace-nowrap text-base font-medium text-white hover:text-[#ff8215]">
                Log out
              </span>
            </div>
          )}
          <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </Popover>
  );
};

export default Header;
