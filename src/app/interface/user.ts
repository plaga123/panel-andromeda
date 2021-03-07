export interface User {
    id:number;
    email:string;
    password:string;
}

export interface UserResponse {
    token:string;    
    email:string;        
}