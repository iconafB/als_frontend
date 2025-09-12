import React, { createContext, useContext, useState } from "react";
import type { UserResponse } from "../api/auth/types";
import { auth_api } from "../api/auth/auth";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType{
    user:UserResponse | null;
    token:string | null;
    isLoading:boolean;
    updateToken:(token:string | null)=>void;
    isAuthenticated:boolean;
}

const AuthContext=createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children}:{children:React.ReactNode}){

    const [token, setToken] = useState<string|null>(localStorage.getItem("token"))

    const updateToken=(token:string|null)=>{

        setToken(token);
        if(token){
           localStorage.setItem("token",token)

        }else{
            localStorage.removeItem("token")
        }
    };

    const {data:user,isLoading}=useQuery({
        queryKey:['user'],
        queryFn:auth_api.get_current_user,
        enabled:!!token
    });


    return(
       <AuthContext.Provider
        
       value={{
            user:user || null,
            token,
            updateToken,
            isLoading,
            isAuthenticated:!!token
        }}

       >
        {children}
       </AuthContext.Provider>
    )

}

export function useAuthContext(){
    const context=useContext(AuthContext)
    if(context===undefined){
        throw new Error("context error")
    }
    return context
}
