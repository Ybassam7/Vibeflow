import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routing/AppRoute";
import AuthContext from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NetworkStatus from "./components/networkStatus/NetworkStatus";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router} />
        <ToastContainer className="mt-14" />
        <NetworkStatus />
      </AuthContext>
    </QueryClientProvider>
  );
}

export default App;
