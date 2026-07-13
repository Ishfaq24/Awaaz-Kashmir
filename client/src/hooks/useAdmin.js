import { useUser } from "@clerk/clerk-react";

export default function useAdmin() {
  const { user } = useUser();

  const ADMIN_ID = import.meta.env.VITE_ADMIN_CLERK_ID;

  return {
    isAdmin: user?.id === ADMIN_ID,
    user,
  };
}