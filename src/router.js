import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import { createBrowserRouter } from "react-router-dom";
import Booking from "./components/booking/Booking";
import ClubOwnerDashboard from "./pages/club-owner/ClubOwnerDashboard";
import Pricing from "./pages/Pricing";

import Profile from "./components/avatar/Profile";

import PaymentCallback from "./pages/PaymentCallback";
import ClubDetail from "./components/booking/ClubDetail";
import Admin from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/booking",
    element: <Booking />,
    path: "/reservation",
    element: <Booking />,
  },
  {
    path: "club-owner",
    element: <ClubOwnerDashboard />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/payment-callback",
    element: <PaymentCallback />,
  },
  {
    path: "/club/:id",
    element: <ClubDetail />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);
