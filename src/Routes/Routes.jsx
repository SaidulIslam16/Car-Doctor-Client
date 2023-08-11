import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Singup from "../pages/Login/Singup";
import Checkout from "../pages/Checkout/Checkout";
import Bookings from "../pages/Bookins/Bookings";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Singup></Singup>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoutes><Checkout></Checkout></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://car-doctor-server-iota-livid.vercel.app/services/${params.id}`)
            },
            {
                path: '/bookings',
                element: <PrivateRoutes>
                    <Bookings></Bookings>
                </PrivateRoutes>
            }
        ]
    },
]);

export default router;