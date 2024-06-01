import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signin from "./routes/signin";
import Signup from "./routes/signup";
import RootLayout from "./routes/rootLayout";
import Inventory from "./routes/inventory";
import ProtectedRoute from "./routes/protectedRoute";
import { AuthProvider } from "./context/authContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Signin />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "inventory",
          element: (
            <AuthProvider>
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
            </AuthProvider>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
