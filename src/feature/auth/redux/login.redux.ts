import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type userRoleType = "SUPER_ADMIN" | "GUARD" | "CUSTOMER"

export interface LoginResponseType {
    id: string;
    name: string;
    email: string;
    role: userRoleType;
}
interface LoginRequestType {
  email: string;
  password: string;
}

export const loginAPI = createApi({
  reducerPath: "loginAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  tagTypes: ["auth"],
  endpoints: (build) => ({
    // login
    login: build.mutation<any, LoginRequestType>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["auth"],
    })
  }),
});

export const { useLoginMutation } = loginAPI;
