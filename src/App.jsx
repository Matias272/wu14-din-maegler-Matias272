import { createBrowserRouter, RouterProvider } from "react-router";
import getAllHomes from "./loaders/getAllHomes";
import getAllAgents from "./loaders/getAllAgents";
import Home from "./pages/Home";
import PropertyList from "./pages/PropertyList";
import "./styles/main.scss";
import Loading from "./components/Loading";

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
    hydrateFallbackElement: <Loading />
  },
  {
    path: "/properties",
    element: <PropertyList />,
    loader: async () => {
      const homes = await getAllHomes();
      return { homes };
    },
    hydrateFallbackElement: <Loading />
  }
]);

export default function App() {
  return (
    <main className="page-wrapper">
      <RouterProvider router={router} />
    </main>
  );
}


