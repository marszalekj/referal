import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { whoami, getKeys, createKey } from "./api";

export default function ApiDashboard({ token }) {
  const [user, setUser] = useState(null);
  const [keys, setKeys] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [error, setError] = useState(null);
  const [creatingKey, setCreatingKey] = useState(false);

  // Fetch user info (whoami)
  useEffect(() => {
    if (!token) return;
    setLoadingUser(true);
    whoami(token)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoadingUser(false));
  }, [token]);

  useEffect(() => {
    if (!token) return;
    setLoadingKeys(true);
    getKeys(token)
      .then(setKeys)
      .catch(setError)
      .finally(() => setLoadingKeys(false));
  }, [token, creatingKey]);

  function handleCreateKey() {
    setCreatingKey(true);
    createKey(token)
      .then((newKey) => setKeys((prev) => [...prev, newKey]))
      .catch(setError)
      .finally(() => setCreatingKey(false));
  }

  if (!token) return null;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">API Dashboard</h2>
      {loadingUser ? (
        <div>Loading user info...</div>
      ) : error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : user ? (
        <div className="mb-6">
          <div className="font-semibold">Connected as: <span className="text-blue-600">{user.email}</span></div>
        </div>
      ) : null}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">API Keys</span>
          <Button variant="outline" onClick={handleCreateKey} disabled={creatingKey}>
            {creatingKey ? "Creating..." : "Create new key"}
          </Button>
        </div>
        {loadingKeys ? (
          <div>Loading keys...</div>
        ) : (
          <ul className="space-y-2">
            {Array.isArray(keys) && keys.length > 0 ? (
              keys.map((k) => (
                <li key={k.id} className="bg-gray-100 rounded px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                  <span className="font-mono break-all">{k.key}</span>
                  <span className="text-xs text-gray-500 mt-1 md:mt-0">Team ID: {k.teamId}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No API keys yet.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
