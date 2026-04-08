import { createBrowserRouter, RouterProvider } from "react-router";
import getAllHomes from "./loaders/getAllHomes";
import getAllAgents from "./loaders/getAllAgents";
import getHomeById from "./loaders/getHomeById";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
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
  },
  {
    path: "/properties/:id",
    element: <PropertyDetails />,
    loader: async ({ params }) => {
      const home = await getHomeById(params.id);
      return { home };
    },
    hydrateFallbackElement: <Loading />
  },
  {
    path: "*",
    element: <NotFound />,
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


