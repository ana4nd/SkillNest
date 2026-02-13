import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

function CreateCourse() {
  const { backendUrl } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      const res = await axios.post(`${backendUrl}/api/v1/course/create`, formData, {
        withCredentials: true,
      });

      console.log(res);

      

      if (res.data.success) {
        toast.success("Course Created Successfully");

        setTitle("");
        setDescription("");
        setImage(null);

        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("SERVER ERROR:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6">Create Course</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          rows="4"
          required
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
