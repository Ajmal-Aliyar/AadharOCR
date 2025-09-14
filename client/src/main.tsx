import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AadhaarProvider } from "./context/AadharContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AadhaarProvider>
      <ErrorBoundary>
        <LandingPage />
      </ErrorBoundary>
      </AadhaarProvider>
    </QueryClientProvider>
  </StrictMode>
);
 