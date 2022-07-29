import IProject from "./Project"

export default interface IUser {
    id: number
    username: string
    fullName: string
    password: string
    confirmPassword?: string
    create_At?: string
    update_At?: string
    projects: IProject[]
}