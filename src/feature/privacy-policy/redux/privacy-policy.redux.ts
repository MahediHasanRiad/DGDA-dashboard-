import { baseQueryWithRefresh } from "@/shared/refresh-token";
import { createApi } from "@reduxjs/toolkit/query/react";

export const privacyPolicyAPI = createApi({
  reducerPath: "privacyPolicyAPI",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Privacy-Policy"],
  endpoints: (build) => ({
    // get privacy policy
    getPrivacyPolicy: build.query<any, any>({
      query: () => ({
        url: "/admin/side-content/privacy-policy/00fe5e2c-a20f-40af-91c7-4d90b2511202",
        method: "GET",
      }),
      providesTags: ["Privacy-Policy"],
    }),

    // update privacy policy
    updatePrivacyPolicy: build.mutation<any, { title?: string; content?: any }>(
      {
        query: ({ title, content }) => ({
          url: `/admin/side-content/privacy-policy/00fe5e2c-a20f-40af-91c7-4d90b2511202`,
          method: "PATCH",
          body: {
            title,
            content,
          },
        }),
        invalidatesTags: ["Privacy-Policy"],
      },
    ),

    // get about us
    getAboutUs: build.query<any, any>({
      query: () => ({
        url: "/admin/side-content/about-us/4f4f6cc1-afaf-4bcf-aa73-187e9bd74e83",
        method: "GET",
      }),
      providesTags: ["Privacy-Policy"],
    }),

    // update about us
    updateAboutUs: build.mutation<any, { title?: string; content?: any }>({
      query: ({ title, content }) => ({
        url: `/admin/side-content/about-us/4f4f6cc1-afaf-4bcf-aa73-187e9bd74e83`,
        method: "POST",
        body: {
          title,
          content,
        },
      }),
      invalidatesTags: ["Privacy-Policy"],
    }),

    // get terms and condition
    getTermsAndCondition: build.query<any, any>({
      query: () => ({
        url: "/admin/side-content/terms-and-condition/cc55902e-939a-42b5-a5cf-94f8c07038a1",
        method: "GET",
      }),
      providesTags: ["Privacy-Policy"],
    }),

    // update terms and condition
    updateTermsAndCondition: build.mutation<any,{ title?: string; content?: any }>({
      query: ({ title, content }) => ({
        url: `/admin/side-content/terms-and-condition/cc55902e-939a-42b5-a5cf-94f8c07038a1`,
        method: "POST",
        body: {
          title,
          content,
        },
      }),
      invalidatesTags: ["Privacy-Policy"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useGetTermsAndConditionQuery,
  useUpdateTermsAndConditionMutation,
} = privacyPolicyAPI;
