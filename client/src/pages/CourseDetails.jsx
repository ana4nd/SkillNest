import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, backendUrl } = useContext(AppContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/course/${id}`);
        if (res.data.success) {
          setCourse(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, backendUrl]);

  // Check enrollment
  useEffect(() => {
    const checkEnrollCourse = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/v1/course/my-courses`,
          { withCredentials: true }
        );

        const enrolledCourses = res.data.data;

        const already = enrolledCourses.some(
          (c) => String(c._id) === String(course?._id)
        );

        setIsEnrolled(already);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && course) {
      checkEnrollCourse();
    }
  }, [user, course, backendUrl]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll in this course");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/course/enroll/${course._id}`,
        {},
        { withCredentials: true }
      );
      console.log(res)
      if (res.data.success) {
        toast.success("Successfully enrolled");
        navigate("/dashboard");
        setIsEnrolled(true);   
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info("Already enrolled");
        setIsEnrolled(true);
      } else {
        toast.error("Enrollment failed");
      }
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!course) {
    return <div className="text-center mt-20">Course not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <div className="max-w-300 p-8 border border-gray-200 flex flex-col ">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-54 object-cover rounded"
        />

        <h1 className="text-3xl font-bold mt-6">{course.title}</h1>

        <button
          onClick={handleEnroll}
          disabled={isEnrolled}
          className={`mt-6 px-6 py-2 rounded ${
            isEnrolled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white"
          }`}
        >
          {isEnrolled ? "Enrolled" : "Enroll Now"}
        </button>
      </div>

      <div>
        <h2 className="font-semibold text-xl">About the Course</h2>
        <p>{course.description}</p>
      </div>
    </div>
  );
}

export default CourseDetails;
