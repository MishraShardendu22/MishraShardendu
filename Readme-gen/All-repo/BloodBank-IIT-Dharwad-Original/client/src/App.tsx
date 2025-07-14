import {
  Donor,
  Patient,
  Landing,
  NotFound,
  DonorLogin,
  Organisation,
  DonorRegister,
  PatientLogin,
  PatientRegister,
  OrganisationLogin,
  OrganisationRegister
} from "./Pages/page"
import Unprotected from "./components/Routes/UnProtectedRoute";
import { Route, Routes } from "react-router-dom";
import "./index.css"
import ProtectedDonor from "./components/Routes/Protected/DonorProtected";
import ProtectedPatient from "./components/Routes/Protected/PatientProtected";
import ProtectedOrganisation from "./components/Routes/Protected/OrganisationProtected";
import LoginAdmin from "./Pages/AdminPages/AdminAuth/login";
import RegisterAdmin from "./Pages/AdminPages/AdminAuth/register";
import Admin from "./Pages/AdminPages/page";
import ProtectedAdmin from "./components/Routes/Protected/AdminPotected";
import DonorSurvey from "./Pages/DonorPages/_components/DonorSurvey";
import PatientSurvey from "./Pages/PatientPages/_components/PatientSurvey";
import ChatBot from "./Pages/_AI-Integration/ChatBot";


const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Unprotected>
            <Landing />
          </Unprotected>
        }
      />
      <Route
        path="patient/chat"
        element={
          <ProtectedPatient>
            <ChatBot />
          </ProtectedPatient>
        }
      />
      <Route
        path="donor/chat"
        element={
          <ProtectedDonor>
            <ChatBot />
          </ProtectedDonor>
        }
      />
      <Route
        path="/donor/login"
        element={
          <Unprotected>
            <DonorLogin />
          </Unprotected>
        }
      />
      <Route
        path="/donor/register"
        element={
          <Unprotected>
            <DonorRegister />
          </Unprotected>
        }
      />
      <Route
        path="/patient/login"
        element={
          <Unprotected>
            <PatientLogin />
          </Unprotected>
        }
      />
      <Route
        path="/patient/register"
        element={
          <Unprotected>
            <PatientRegister />
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
      path="/donor/dashboard"
      element={
        <ProtectedDonor>
          <Donor />
        </ProtectedDonor>
      }
      />
      <Route 
      path="/patient/dashboard"
      element={
        <ProtectedPatient>
          <Patient />
        </ProtectedPatient>
      }
      />
      <Route 
      path="/patient/survey"
      element={
        <ProtectedPatient>
          <PatientSurvey />
        </ProtectedPatient>
      }
      />
      <Route 
      path="/donor/survey"
      element={
        <ProtectedDonor>
          <DonorSurvey />
        </ProtectedDonor>
      }
      />
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
