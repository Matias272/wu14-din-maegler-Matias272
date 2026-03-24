import { createBrowserRouter, RouterProvider } from "react-router";
import Home, { homesLoader } from "./pages/Home";
import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homesLoader,
  },
]);

export default function App() {
  return (
    <main className="page-wrapper">
      <RouterProvider router={router} />
    </main>
  );
}


