import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import QuoteFormPage from "./pages/QuoteFormPage";
import ViewQuotes from "./pages/ViewQuotesPage";
import SignIn from "./pages/SignInPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <SignIn /> }, 
      { path: "quote", element: <QuoteFormPage /> },
      { path: "view-quotes", element: <ViewQuotes /> },
      { path: "customer", element: <CustomerDetailsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
