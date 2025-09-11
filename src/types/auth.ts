
export interface LoginFormData{
    username:string;
    password:string;
}

export interface RegisterFormData{
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface User{
    id:number;
    email:string;
    firstname:string;
    lastname:string;
}

export interface AuthResponse{
    user:User;
    token:string;
}