import {
  User,
  LandingPage,
  NotFound,
  Organisation,
  OrganisationLogin,
  OrganisationRegister
} from "./Pages/page"
import Unprotected from "./components/Routes/UnProtectedRoute";
import { Route, Routes } from "react-router-dom";
import "./index.css"
import ProtectedOrganisation from "./components/Routes/Protected/OrganisationProtected";
import LoginAdmin from "./Pages/AdminPages/AdminAuth/login";
import RegisterAdmin from "./Pages/AdminPages/AdminAuth/register";
import Admin from "./Pages/AdminPages/page";
import ProtectedAdmin from "./components/Routes/Protected/AdminPotected";
import ChatBot from "./Pages/AI-Integration/ChatBot";
import ProtectedUser from "./components/Routes/Protected/UserProtected";
import LoginUser from "./Pages/UserPages/UserAuth/login";
import RegisterUser from "./Pages/UserPages/UserAuth/register";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Unprotected>
            <LandingPage />
          </Unprotected>
        }
      />
      <Route
        path="user/chat"
        element={
          <ProtectedUser>
            <ChatBot />
          </ProtectedUser>
        }
      />
      <Route
        path="/user/login"
        element={
          <Unprotected>
            <LoginUser />
          </Unprotected>
        }
      />
      <Route
        path="/user/register"
        element={
          <Unprotected>
            <RegisterUser />
          </Unprotected>
        }
      />
      <Route
        path="/organisation/login"
        element={
          <Unprotected>
            <OrganisationLogin />
          </Unprotected>
        }
      />
      <Route
        path="/organisation/register"
        element={
          <Unprotected>
            <OrganisationRegister />
          </Unprotected>
        }
      />
      <Route 
      path="/user/dashboard"
      element={
        <ProtectedUser>
          <User />
        </ProtectedUser>
      }
      />
      {/* <Route 
      path="/user/survey"
      element={
        <ProtectedUser>
          <UserSurvey />
        </ProtectedUser>
      }
      /> */}
      <Route 
      path="/organisation/dashboard"
      element={
        <ProtectedOrganisation>
          <Organisation />
        </ProtectedOrganisation>
      }
      />
      <Route 
      path="/admin/login"
      element={
        <Unprotected>
          <LoginAdmin />
        </Unprotected>
      }
      />
      <Route 
      path="/admin/register"
      element={
        <Unprotected>
          <RegisterAdmin />
        </Unprotected>
      }
      />
      <Route 
      path="/admin/dashboard"
      element={
        <ProtectedAdmin>
          <Admin />
        </ProtectedAdmin>
      }
      />
  
      <Route
        path="*"
        element={
          <Unprotected>
            <NotFound />
          </Unprotected>
        }
      />
    </Routes>
  );
};
export default App;
