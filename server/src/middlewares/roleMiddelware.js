import { ApiError } from "../utils/api-error.js";

export const adminOnly = (req,res, next)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(
            403,
            "Access denied: Admin only"
        )
    }
    next();
}