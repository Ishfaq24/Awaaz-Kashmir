import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

import api from "../lib/api";

export default function useSyncUser() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const sync = async () => {
      try {
        const token = await getToken();

        await api.post(
          "/auth/sync",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    sync();
  }, [isSignedIn, getToken]);
}