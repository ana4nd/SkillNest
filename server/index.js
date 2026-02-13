import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import authRouter from "./src/routes/auth.routes.js"
import courseRouter from "./src/routes/course.routes.js"
import connectDB from "./src/db/db.js";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = 8000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// Connect Db
connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);

app.use("/images", express.static("public/images"));

app.get("/", (req,res)=>{
    res.send("Everything is fine");
})

app.listen(PORT, ()=>{
    console.log("Server listen on Port:", PORT);
})