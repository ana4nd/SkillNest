import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { CircleChevronLeft, Menu, User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  let { user, setUser, backendUrl, navigate } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/v1/auth/logout`,
        {},
        { withCredentials: true },
      );

      setUser(null);
      navigate("/login");
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-2xs px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <img
            src={assets.logo}
            alt="logo"
            className="h-20 w-40 object-cover"
          />
        </Link>

        <ul className="hidden sm:flex gap-5">
          <NavLink to={"/"}>
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-indigo-500 hidden" />
          </NavLink>
          <NavLink to={"/courses"}>
            <p>Courses</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-indigo-500 hidden" />
          </NavLink>
          <NavLink to={"/about"}>
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-indigo-500 hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-6">

          {user ? (
            <div className="relative">
              <User
                className="w-5 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-36 bg-white shadow-md rounded-md">
                  <div className="flex flex-col text-sm">
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Courses
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <User className="w-5 cursor-pointer" />
            </NavLink>
          )}

          <Menu
            onClick={() => setVisible(true)}
            className="w-5 cursor-pointer sm:hidden"
          />

          <div className="hidden sm:flex gap-2">
            {user?.role === "admin" && (
              <Link to="/create-course">
                <button className="bg-indigo-600 text-white text-sm py-2 px-3 rounded-md cursor-pointer">
                  Create Course
                </button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/manage-course">
                <button className="bg-indigo-600 text-white text-sm py-2 px-3 rounded-md cursor-pointer">
                  Manage Course
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar menu for small screen */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-40" : "w-0"
        }`}
      >
        <div className="flex flex-col">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <CircleChevronLeft />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-slate-50"
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-slate-50"
            to={"/courses"}
          >
            Courses
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border border-slate-50"
            to={"/about"}
          >
            About
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              className="py-2 pl-6 border border-slate-50"
              onClick={() => setVisible(false)}
              to="/create-course"
            >
              Create Course
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              className="py-2 pl-6 border border-slate-50"
              onClick={() => setVisible(false)}
              to="/manage-course"
            >
              Manage Course
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
