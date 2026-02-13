import React, { use, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import CourseCard from "../components/CourseCard.jsx";

function Courses() {
  const { backendUrl } = useContext(AppContext);

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const deleteCourse = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/v1/course/${id}`, {
        withCredentials: true,
      });

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
      }

      setCourse((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [backendUrl]);

  return (
    <section className="px-8 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Created Courses</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {course.map((course,index) => (
            <CourseCard
              key={CourseCard._id}
              index = {index}
              course={course}
              showDelete={true}
              onDelete={deleteCourse}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Courses;
