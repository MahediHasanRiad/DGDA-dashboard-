import { baseQueryWithRefresh } from "@/shared/refresh-token";
import { createApi } from "@reduxjs/toolkit/query/react";

export type userRoleType = "SUPER_ADMIN" | "GUARD" | "CUSTOMER"

export interface LoginResponseType {
    id: string;
    name: string;
    email: string;
    role: userRoleType;
}

export const authApi = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["auth"],
  endpoints: (build) => ({

    // get user 
    getUser: build.query<any, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET'
      }),
      providesTags: ['auth']
    })
  }),
});

export const { useGetUserQuery } = authApi;
