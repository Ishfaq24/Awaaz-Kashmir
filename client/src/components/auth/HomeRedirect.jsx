import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function HomeRedirect() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const ADMIN_ID = import.meta.env.VITE_ADMIN_CLERK_ID;

  if (user?.id === ADMIN_ID) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/home" replace />;
}