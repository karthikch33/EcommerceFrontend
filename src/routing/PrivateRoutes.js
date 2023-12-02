import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";



export const PrivateRoutes = ({children})=>{
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    return getTokenFromLocalStorage !== null ? children : (<>{toast.error('Login Required')}<Navigate to={'/login'} replace={true}/></>)
}