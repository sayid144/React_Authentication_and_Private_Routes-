import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import BASE_URL from './BaseURL'
import Cookies from 'js-cookie'

const setToken = (token) => {
    Cookies.set("token", token, { expires: 1 })
};
export const authSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    //tagTypes: ['Note'],

    endpoints: (builder) => ({
        //Register
        register: builder.mutation({
            query: (newUser) => {
                return {
                    url: "register",
                    method: "POST",
                    body: newUser
                }
            },
            //ProvidesTags: ["notes"],
        }),
        //Log in
        login: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
            //invalidatesTags: ['Note'],
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;

                    //localStorage.setItem("token", result.token);
                    setToken(result.data.token)
                } catch (error) {
                    console.log(error)
                }
            }
        }),

    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
} = authSlice

export default authSlice.reducer
