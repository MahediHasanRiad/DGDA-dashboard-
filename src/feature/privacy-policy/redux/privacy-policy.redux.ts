import { baseQueryWithRefresh } from "@/shared/refresh-token";
import { createApi } from "@reduxjs/toolkit/query/react";

export const privacyPolicyAPI = createApi({
  reducerPath: "privacyPolicyAPI",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Privacy-Policy"],
  endpoints: (build) => ({
    // list of all site content
    allSiteContent: build.query<any, void>({
      query: () => ({
        url: "/admin/site-content",
      }),
      providesTags: ["Privacy-Policy"],
    }),

    // update site content
    updateSiteContent: build.mutation<any, any>({
      query: ({ id, content }: { id: string; content: any }) => ({
        url: `/admin/site-content/${id}`,
        method: "PATCH",
        body: {
          content,
        },
      }),
      invalidatesTags: ["Privacy-Policy"],
    }),
  }),
});

export const { useAllSiteContentQuery, useUpdateSiteContentMutation } =
  privacyPolicyAPI;
