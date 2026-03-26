import { createBrowserRouter, RouterProvider } from "react-router";
import getAllHomes from "./loaders/getAllHomes";
import getAllAgents from "./loaders/getAllAgents";
import Home from "./pages/Home";
import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async ({ request }) => {
      const [homes, agents] = await Promise.all([
        getAllHomes(request),
        getAllAgents(),
      ]);
      return { homes, agents };
    },
    hydrateFallbackElement: <h1>Loading.............................................................................................................................</h1>
  }
]);

export default function App() {
  return (
    <main className="page-wrapper">
      <RouterProvider router={router} />
    </main>
  );
}


