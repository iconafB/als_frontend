import { campaigns_client } from "../campaigns_client"
import axios from "axios";

import type { UserResponse,LoginUser,RegisterUser,Token,CurrentUser } from "./types"

export const auth_api={
    //register user
    register_user:async(data:RegisterUser):Promise<UserResponse>=>{
       try {
            const response=await campaigns_client.post("/auth/register",data);
            return response.data
       } catch (error) {
            throw new Error(`error:${error}`)
       }
    },
    //login user
    login_user:async(data:LoginUser):Promise<Token>=>{
        try {
            const formData=new FormData()
            formData.append("username",data.username)
            formData.append("password",data.password)
            const response=await campaigns_client.post("/auth/login",formData,{headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }});
            return response.data

        } catch (error) {
            throw new Error("An error occurred while logging in")
        }
    },
    //get current user
    get_current_user:async():Promise<UserResponse>=>{
        try {
            const user=await campaigns_client.get("/auth/user")
            return user.data

        } catch (error) {
            throw new Error("An error occurred while getting ")
        }
    },
    get_current_user_admin:async():Promise<CurrentUser>=>{
        try {
            const current_user=await campaigns_client.get('/auth/me')
            return current_user?.data
        } catch (error) {
            if(axios.isAxiosError(error)){
                throw error
            }
            throw error
        }
    }
}
