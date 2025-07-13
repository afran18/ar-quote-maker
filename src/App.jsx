import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerDetails from "./pages/CustomerDetails";
import QuoteFormPage from "./pages/QuoteFormPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CustomerDetails /> },
    { path: "/quote", element: <QuoteFormPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
