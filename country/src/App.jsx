import Country from "./components/Country";
import Navbar from "./components/Navbar.jsx";
import CountryPage from "./components/Page/CountryPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Country />,
    },
    {
      path: "/:country",
      element: <CountryPage />,
    },
  ]);
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
