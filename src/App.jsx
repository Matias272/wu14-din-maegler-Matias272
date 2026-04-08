import { createBrowserRouter, RouterProvider } from "react-router";
import getAllHomes from "./loaders/getAllHomes";
import getAllAgents from "./loaders/getAllAgents";
import getHomeById from "./loaders/getHomeById";
import getAgentById from "./loaders/getAgentById";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PropertyList from "./pages/PropertyList";
import PropertyDetails from "./pages/PropertyDetails";
import Agents from "./pages/Agents";
import AgentDetails from "./pages/AgentDetails";
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
    path: "/agents",
    element: <Agents />,
    loader: async () => {
      const agents = await getAllAgents();
      return { agents };
    },
    hydrateFallbackElement: <Loading />
  },
  {
    path: "/agents/:id",
    element: <AgentDetails />,
    loader: async ({ params }) => {
      const agent = await getAgentById(params.id);
      return { agent };
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


