export interface UserType {
    id?: number,
    fullname: String,
    username: String,
    email: String,
    password: String
}

export interface UserloggedInType {
    id: number,
    fullname: String,
    username: String,
    email: String,
    token: String,
}

