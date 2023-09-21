import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home.tsx";
import Signup from "./pages/Sign-up.tsx";
import {loader as imageLoader} from './pages/Home.tsx'
import ErrorPage from "./pages/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: imageLoader
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
