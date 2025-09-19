import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth_api } from "../api/auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//import type { LoginFormData,RegisterFormData,User } from "../types/auth";


export const useAuth=()=>{

    const queryClient=useQueryClient();

    const navigate=useNavigate()

    const loginMutation=useMutation({
      
        mutationFn:auth_api.login_user,
        onSuccess:(data)=>{
            localStorage.setItem('token',data.access_token);
            setTimeout(() => {navigate("/dashboard");}, 100);
            toast.success("logged in successfully");
        }
    });

    const registerMutation = useMutation({
    mutationFn: auth_api.register_user,
    onSuccess: (data) => {
      toast.success(`${data.first_name} registered`);
    },
  });


   const logout = () => {
    localStorage.removeItem('token');
     console.log("print the removed token")
    console.log(localStorage.getItem('token'))
    localStorage.removeItem('user');
    queryClient.setQueryData(['user'], null);
  };



  
   return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
  


}

