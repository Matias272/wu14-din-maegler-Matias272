import { Route, Routes, BrowserRouter } from "react-router"
import Home from "./pages/Home"
export default function App() {

  return (
    <main className="page-wrapper">
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
    </main>
  )
}


