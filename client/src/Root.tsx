import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";


function Root() {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  
  return (
    <RouterProvider router={router} />
  )
}

export default Root
