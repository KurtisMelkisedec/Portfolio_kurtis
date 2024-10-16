export interface UserConnexion{
    email:string
    password:string
}
export interface UserConnected{
    id:number
    username:string,
    token:string,
    roles:string[]
}

export interface userModel{
    id:number
    username:string,
    image:string
}