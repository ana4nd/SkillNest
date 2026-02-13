import React, { use, useContext, useEffect, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";

function Courses() {
  const { backendUrl } = useContext(AppContext);

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Courses
  
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/course`);
      console.log(res);
      if (res.data.success) {
        setCourse(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [backendUrl]);

  return (
    <section className="px-8 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Our Popular Courses
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
          {course.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Courses;
