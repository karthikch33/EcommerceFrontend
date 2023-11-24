import { Navigate } from "react-router-dom";



export const OpenRoute = ({children})=>{
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('user'))   
    return getTokenFromLocalStorage === null ? children : (<Navigate to={'/profile'} replace={true}/>)
}