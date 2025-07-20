import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import QuoteFormPage from "./pages/QuoteFormPage";
import ViewQuotes from "./pages/ViewQuotesPage";
import SignIn from "./pages/SignInPage";
import { DUMMY_CREDENTIALS } from "./utils/auth";



const requireAuth = () => {
  if(localStorage.getItem("isLoggedIn") !== "true") {
    throw redirect("/"); 
  }
}

const redirectIfLoggedIn = () => {
  if(localStorage.getItem("isLoggedIn") === "true") {
    throw redirect("/view-quotes");
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, loader: redirectIfLoggedIn ,element: <SignIn /> }, 
      { path: "view-quotes", loader: requireAuth, element: <ViewQuotes /> },
      { path: "customer", loader: requireAuth, element: <CustomerDetailsPage /> },
      { path: "quote", loader: requireAuth, element: <QuoteFormPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
