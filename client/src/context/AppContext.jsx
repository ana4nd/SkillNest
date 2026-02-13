import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    

    useEffect(()=>{
        const res = axios.get(`${backendUrl}/api/v1/auth/me`, {withCredentials: true});
        res.then((res)=>{
            setUser(res.data.data);
        }).catch((err)=>{
            console.log(err);
            setUser(null);
        })
    },[]);


    const value = {
        user,
        setUser,
        backendUrl,
        navigate
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;