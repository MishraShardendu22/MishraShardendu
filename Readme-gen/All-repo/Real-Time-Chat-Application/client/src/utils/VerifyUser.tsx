import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.tsx";

export const VerifyUser = () => {
    const authContext = useAuth();
    const authUser = authContext ? authContext.authUser : null;
    return authUser ? <Outlet /> : <Navigate to="/register" />;
}