import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import QuoteFormPage from "./pages/QuoteFormPage";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <CustomerDetailsPage /> },
    { path: "/quote", element: <QuoteFormPage /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
