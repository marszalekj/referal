import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <div className="flex  items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl bg-white border border-black/10 shadow-none rounded-lg">
        <CardHeader>
          <CardTitle className="text-center">API Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingUser ? (
            <div className="text-center text-gray-500">Loading user info...</div>
          ) : error ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : user ? (
            <div className="mb-6 text-center">
              <span className="font-semibold">Connected as: </span>
              <span className="text-blue-600">{user.email}</span>
            </div>
          ) : null}

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">API Keys</span>
              <Button onClick={handleCreateKey} disabled={creatingKey} className="cursor-pointer bg-black text-white border border-black hover:bg-gray-900 rounded-lg">
                {creatingKey ? "Creating..." : "New key"}
              </Button>
            </div>
            {loadingKeys ? (
              <div className="text-center text-gray-500">Loading keys...</div>
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
        </CardContent>
      </Card>
    </div>
  );
}
