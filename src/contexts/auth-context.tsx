import React, { createContext, useContext, useState,useCallback,useMemo,useEffect } from "react";

interface AuthContextType{
    token:string | null;

    updateToken:(token:string | null)=>void;

    isAuthenticated:boolean;
}


const AuthContext=createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children:React.ReactNode}){
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

    const updateToken=useCallback((token: string| null)=>{
        setToken(token);
        if(token){
           localStorage.setItem("token",token)

        }else{
            localStorage.removeItem("token")
        }
    },[]);

    const value=useMemo(()=>({
        token,
        updateToken,
        isAuthenticated:!!token
    }),[token,updateToken])

    // handle token changes from other tabs or direct localStorage manipulation
    useEffect(() => {
        const handleStorageChange = () => {
        const newToken = localStorage.getItem("token");
        if (newToken !== token) {
          setToken(newToken);
        }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, [token]);
    return(
       <AuthContext.Provider
           value={value}
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
