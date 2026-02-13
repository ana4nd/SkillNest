import express from "express";
import { addCourse, deleteCourse, enrollCourse, getAllCourses, getCoursesById, getEnrolledCourse } from "../controllers/course.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminOnly } from "../middlewares/roleMiddelware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllCourses);

router.get("/my-courses", verifyJWT, getEnrolledCourse);

router.post("/create", verifyJWT, adminOnly, upload.single("image"), addCourse);

router.post("/enroll/:courseId", verifyJWT, enrollCourse);

router.delete("/:id", verifyJWT, adminOnly, deleteCourse);

router.get("/:id", getCoursesById);

export default router;