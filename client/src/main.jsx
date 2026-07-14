import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "leaflet/dist/leaflet.css";
import socket from "./lib/socket";

import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/clerk-react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AppRoutes from "./routes/AppRoutes";
import SyncUserProvider from "./components/auth/SyncUserProvider";

const clerkPubKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error(
    "Missing Clerk Publishable Key"
  );
}

const queryClient = new QueryClient();
socket.connect();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <SyncUserProvider>
          <AppRoutes />
        </SyncUserProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 4000,

            success: {
              icon: "🔔",
            },

            error: {
              icon: "❌",
            },

            style: {
              borderRadius: "16px",
              background: "#ffffff",
              color: "#1f2937",
              border: "1px solid #E5E7EB",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
              padding: "16px",
            },
          }}
        />

      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);