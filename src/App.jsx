import { createBrowserRouter, RouterProvider } from "react-router";
import getAllHomes from "./loaders/getAllHomes";
import Home from "./pages/Home";
import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: getAllHomes,
  },
]);

export default function App() {
  return (
    <main className="page-wrapper">
      <RouterProvider router={router} />
    </main>
  );
}


