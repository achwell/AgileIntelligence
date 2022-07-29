import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import IUser from "../../models/User"
import JWTLoginSucessReponse from "../../models/JWTLoginSucessReponse"
import {login, logout} from "../auth/auth-slice"

export const userApiSlice = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        //baseUrl: "http://localhost:8080",
    }),
    tagTypes: ['User'],
    endpoints(builder) {
        return {
            createUser: builder.mutation<IUser, Partial<IUser>>({
                query: (body) => ({
                    url: `/api/users`,
                    method: 'POST',
                    body,
                }),
                invalidatesTags: [{ type: 'User', id: 'LIST' },'User'],
            }),
            login: builder.mutation<JWTLoginSucessReponse, Partial<IUser>>({
                query: (body) => ({
                    url: `/api/users/login`,
                    method: 'POST',
                    body,
                }),
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data:{success, token} } = await queryFulfilled;
                    if(success) {
                        await dispatch(login(token))
                    } else {
                        await dispatch(logout());
                    }
                } catch (error) {}
            },
                invalidatesTags: [{ type: 'User', id: 'LIST' },'User'],
            }),
        }
    }
})
export const {useCreateUserMutation, useLoginMutation} = userApiSlice
