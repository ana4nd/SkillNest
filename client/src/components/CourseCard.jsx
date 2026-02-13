import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function CourseCard({ course, showDelete, onDelete }) {

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>

        <p className="text-gray-600 text-sm">
          {course.description.slice(0, 50)}
        </p>

        <div className="flex gap-4">
          <Link to={`/course-details/${course._id}`}>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer">
              View Details
            </button>
          </Link>
          
          {/* Ye button only manage course me show krega waha se hum delete kr sakte hai */}
          {showDelete && (
            <button
              onClick={() => onDelete(course._id)}
              className="mt-4 bg-black text-white px-4 py-2 rounded cursor-pointer">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
