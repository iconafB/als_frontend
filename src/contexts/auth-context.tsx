import React, { createContext, useContext, useState } from "react";
import type { UserResponse } from "../api/auth/types";
import { auth_api } from "../api/auth/auth";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType{
    token:string | null;
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


    return(
       <AuthContext.Provider
            value={{
                 token,
                 updateToken,
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
