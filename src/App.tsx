import { Route, Routes } from "react-router";
import LoginPage from "./feature/auth/login.page";
import Layout from "./feature/layout/layout.page";
import OverviewPage from "./feature/overview/overview.page";
import UsersPage from "./feature/users/users.page";
import PrivacyPolicyPage from "./feature/privacy-policy/privacy-polity";
import TermsAndConditionPage from "./feature/privacy-policy/terms-and-condition";
import CookiePage from "./feature/privacy-policy/cookie";
import NewsPressPage from "./feature/news-press/news-press.page";
import OfficesPage from "./feature/offices/offices.page";
import DocumentsPage from "./feature/documents/documents.page";
import ProfilePage from "./feature/profile/profile.page";
import PartnersPage from "./feature/partner and sponsors/partners.page";
import AIKnowledgeTrainerPage from "./feature/ai-knowledge-trainer/ai-knowledge-trainer.page";



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
          <Route path="/" element={<OverviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/news" element={<NewsPressPage />} />
          <Route path="/offices" element={<OfficesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/ai-trainer" element={<AIKnowledgeTrainerPage />} />
          <Route path="/ai-knowledge-trainer" element={<AIKnowledgeTrainerPage />} />
          <Route path="/profile" element={<ProfilePage />} />


          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
          <Route path="/Cookie" element={<CookiePage />} />
         
        </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
