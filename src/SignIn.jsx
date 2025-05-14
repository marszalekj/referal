import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { signin } from "./api";

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await signin(email, password);
      onSignIn(data);
    } catch (err) {
      setError("Sign up failed: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      <Button type="submit" variant="outline" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
}
