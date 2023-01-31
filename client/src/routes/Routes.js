import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/404/NotFound";
import Chat from "../components/Chat/Chat";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Main from "../layouts/Main";
import PrivateRoute from "./PrivateRoute";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Chat/></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signUp',
                element: <SignUp/>
            }
            
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
]);


export default router;