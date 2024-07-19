import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import { createBrowserRouter } from "react-router-dom";
import Booking from "./components/booking/Booking";
import Pricing from "./pages/Pricing";


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
    element: <AboutUs />
  },
  {
    path: "/reservation",
    element: <Booking />
  },
  {
    path: "/pricing",
    element: <Pricing />
  }
]);
