import React, { useContext, useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  let { user, backendUrl } = useContext(AppContext);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  const fetchEnrollCourses = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/course/my-courses`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollCourses();
  }, [backendUrl, user]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!courses.length) {
    return (
      <p className="text-center mt-20">
        You have not enrolled in any courses yet
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 h-screen">
      <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} showButton={false} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
