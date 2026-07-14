import useSyncUser from "../../hooks/useSyncUser";

export default function SyncUserProvider({ children }) {
  useSyncUser();
  return children;
}
