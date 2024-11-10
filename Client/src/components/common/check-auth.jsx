import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({isAuthenticated, user, children}) {

    const location=useLocation();
    if(!isAuthenticated && !(
        location.pathname.includes("/login") || location.pathname.includes("/register")))

    return (
        <Navigate to="/auth/login"/>
    )
    if(isAuthenticated && (location.pathname.includes("/auth") || location.pathname.includes("/register")))
    {
        if(user?.role==="admin") return <Navigate to="/admin/property"/>
        else return <Navigate to="/customer/listing"/>
    }
    if(isAuthenticated && user?.role!=='admin' && location.pathname.includes("/admin"))
    {
        return <Navigate to="/unauth-page"/>
    }
    if(isAuthenticated && user?.role==='admin' && location.pathname.includes("/customer"))
    {
        return <Navigate to="/admin/property"/>
    }   
    return <>{children}</>
}

export default CheckAuth;