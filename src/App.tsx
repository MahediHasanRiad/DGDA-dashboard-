import { Route, Routes } from "react-router";
import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import LoginPage from "./feature/auth/login.page";
import Layout from "./feature/layout/layout.page";
import HomePage from "./feature/home/home.page";
import PrivacyPolicyPage from "./feature/privacy-policy/privacy-polity";


export const ProtectedRoute = () => {
  // const { token } = useSelector((state: RootState) => state.auth);
  // const localToken = localStorage.getItem("access-token");

  // if (!token && !localToken) {
  //   return <Navigate to="/login" replace />;
  // }
  // return <Outlet />;
};

function App() {
  
  // const dispatch = useDispatch<AppDispatch>();
  // const { token } = useSelector((state: RootState) => state.auth);
  // const localToken = localStorage.getItem("access-token");
  // const hasToken = !!(token || localToken);

  // const { data: userProfile, isLoading: isUserLoading, isUninitialized } =
  //  useGetUserQuery(undefined, { skip: !hasToken });

  // useEffect(() => {
  //   if (userProfile) {
  //     dispatch(getUser(userProfile?.data));
  //   }
  // }, [userProfile, dispatch]);

  // block rendering protected routes until we actually know who the user is

  // if (hasToken && (isUserLoading || isUninitialized)) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
         
        </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
