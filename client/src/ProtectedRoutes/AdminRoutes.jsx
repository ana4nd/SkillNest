import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

function AdminRoute({children}){
    const {user} = useContext(AppContext);

    // if user is not logged in
    if(!user){
        return <Navigate to="/login" replace/>;
    }

    // if user is not admin
    if(user.role !== "admin"){
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default AdminRoute;