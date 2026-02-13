import { Course } from "../models/course.model.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import fs from "fs/promises";
import path from "path";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//  ADD COURSE
export const addCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !req.file) {
    throw new ApiError(400, "Title and Image are required");
  }
  // console.log("file", req.file);
  const uploadedImage = await uploadOnCloudinary(
    req.file.path,
    "course-images",
  );
  const course = await Course.create({
    title,
    description,
    image: uploadedImage.url,
    public_id: uploadedImage.public_id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, course, "Course created successfully"));
});

// GET ALL COURSES
export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "All courses fetched successfully"));
});

//  GET COURSE BY ID
export const getCoursesById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course fetched successfully"));
});

//  DELETE COURSE


export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Delete from Cloudinary
  if (course.public_id) {
    await cloudinary.uploader.destroy(course.public_id);
  }

  // Delete from local folder (if stored)
  if (course.image) {
    try {
      const localPath = path.join("public/images", path.basename(course.image));
      await fs.unlink(localPath);
    } catch (err) {
      console.log("Local file not found or already deleted");
    }
  }

  // Delete from database
  await Course.deleteOne({ _id: course._id });

  return res.status(200).json(
    new ApiResponse(200, null, "Course deleted successfully")
  );
});


export const enrollCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.enrolledCourses.includes(courseId)) {
    throw ApiError("Already enrolled in Course");
  }

  user.enrolledCourses.push(courseId);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user.courseId, "Enrolled successfully"));
});

export const getEnrolledCourse = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("enrolledCourses");

  return res
    .status(200)
    .json(new ApiResponse(200, user.enrolledCourses, "Enrolled successfully"));
});
