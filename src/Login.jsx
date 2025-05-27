import { useState } from 'react';
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
import { login } from "./api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      onLogin(data);
    } catch (err) {
      setError("Login failed: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md bg-white border border-black rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] px-8 py-10 flex flex-col items-center">
        <CardHeader className="w-full flex flex-col items-center mb-8">
  <CardTitle className="text-center text-4xl font-extrabold tracking-tight font-sans text-black mb-2">Log in</CardTitle>
</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-white text-black border border-black rounded-2xl placeholder-gray-400 focus:ring-black focus:border-black px-5 py-3 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-white text-black border border-black rounded-2xl placeholder-gray-400 focus:ring-black focus:border-black px-5 py-3 transition-all duration-200"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer bg-black text-white border border-black rounded-2xl px-6 py-3 font-semibold hover:bg-white hover:text-black transition-all duration-200" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
