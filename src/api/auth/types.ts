
export interface RegisterUser{
    full_name:string;
    password:string;
    email:string;

}

export interface LoginUser{
    password:string;
    email:string;
}

export interface UserResponse{
    id:number;
    email:string;
    full_name:string;
    is_active:boolean;
}

export interface Token{
    access_token:string;
    token_type:string;
}

