import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import IUser from "../../models/User"
import jwt_decode from "jwt-decode"

interface AuthState {
    value?: IUser
}
const initialState: AuthState = {value: undefined}
const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            const token = action.payload;
            localStorage.setItem("token", token)
            state.value = jwt_decode(token) as IUser
        },
        logout(state) {
            localStorage.removeItem("token")
            state.value = undefined
        }
    }
})
export const { login, logout } = userSlice.actions
export default userSlice.reducer
