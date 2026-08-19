import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Only one request should trigger the refresh
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = localStorage.getItem("refresh-token");

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token", // adjust to your actual refresh endpoint
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { accessToken, refreshToken: newRefreshToken } =
            refreshResult.data as {
              accessToken: string;
              refreshToken?: string;
            };

          localStorage.setItem("access-token", accessToken);
          if (newRefreshToken) {
            localStorage.setItem("refresh-token", newRefreshToken);
          }

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh failed — log the user out
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
          window.location.href = "/login";
        }
      } finally {
        release();
      }
    } else {
      // Another request is already refreshing — wait for it, then retry
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
