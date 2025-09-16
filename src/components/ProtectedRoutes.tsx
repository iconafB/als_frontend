import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
interface ProtectedRouteProps{
    children:React.ReactNode;
}

export function ProtectedRoute({children}:ProtectedRouteProps){
    
    const {isAuthenticated}=useAuthContext()

    const location=useLocation()

  /*   if(isLoading){
        return(
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }
     */
    if(!isAuthenticated){

        return <Navigate to="/dashboard" state={{from:location}} replace/>
    }

    return <>{children}</>
}