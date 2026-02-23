// src/pages/Logout.jsx
import { useEffect } from "react";
import { useAuth } from "../contexts/auth";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    // moet achter de render gebeuren
    logout();
  }, [logout]);

  if (isAuthed) {
    return <h1>Logging out...</h1>;
  }

  return <h1>You were successfully logged out</h1>;
}
