import { Navigate } from 'react-router-dom';
export default function PrivateRoute({Component}){
    return localStorage.getItem("jwtToken") ? <Component/>:<Navigate to="/" />
}