import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./components/SignUp";
import OtpPage from "./components/Otp";
import LoginPage from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Blog from "./components/Blog";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
        <Route path="/blog" element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
