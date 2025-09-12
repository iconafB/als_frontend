export interface RegisterUser{
    first_name:string;
    last_name:string;
    password:string;
    email:string;
}

export interface LoginUser{
    password:string;
    username:string;
}

export interface UserResponse{
    id:number;
    first_name:string;
    last_name:string;
    email:string;
}

export interface Token{
    access_token:string;
    token_type:string;
}
