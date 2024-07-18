import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import { createBrowserRouter } from "react-router-dom";
import Booking from "./components/booking/Booking";
import FAQs from "./pages/FAQs";
import ClubOwnerDashboard from "./pages/club-owner/ClubOwnerDashboard";

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
  },
  {
    path: "/faqs",
    element: <FAQs />,
  },
  {
    path: "club-owner",
    element: <ClubOwnerDashboard />,
  },
]);
