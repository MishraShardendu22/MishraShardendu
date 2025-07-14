import "./index.css";
import { StrictMode } from "react";
import Login from "./pages/login.jsx";
import Admin from "./pages/admin.jsx";
import Signup from "./pages/signup.jsx";
import Tickets from "./pages/tickets.jsx";
import { createRoot } from "react-dom/client";
import TicketDetailsPage from "./pages/ticket.jsx";
import CheckAuth from "./components/check-auth.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth >
              <Tickets />
            </CheckAuth>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <CheckAuth >
              <TicketDetailsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/login"
          element={
            <CheckAuth >
              <Login />
            </CheckAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <CheckAuth >
              <Signup />
            </CheckAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <CheckAuth >
              <Admin />
            </CheckAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
