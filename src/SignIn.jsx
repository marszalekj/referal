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
import { signin } from "./api";

// SignIn component handles user registration (sign up)
// Props:
//   onSignIn: callback function to execute after successful signup
export default function SignIn({ onSignIn }) {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for error message and loading status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles form submission for sign up
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Native form validation (checks required fields and email format)
    if (!e.target.checkValidity()) {
      setLoading(false);
      setError("Please enter a valid email.");
      return;
    }
    try {
      // Calls the signin API with email and password
      const data = await signin(email, password);
      // Calls parent callback to update user state
      onSignIn(data);
    } catch (err) {
      // Displays error message if signup fails
      setError("Sign up failed: " + (err.message || "unknown error"));
    } finally {
      setLoading(false);
    }
  }

  // Renders the sign up form inside a styled Card
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center bg-white px-4">
      {/* Main Card container for the sign up form */}
      <Card className="w-full max-w-md bg-white border border-black rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] px-8 py-10 flex flex-col items-center">
        {/* Card header with title */}
        <CardHeader className="w-full flex flex-col items-center mb-8">
  <CardTitle className="text-center text-4xl font-extrabold tracking-tight font-sans text-black mb-2">Sign up</CardTitle>
</CardHeader>
        <CardContent>
          {/* Sign up form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {/* Email input field */}
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
            {/* Password input field */}
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
            {/* Submit button, shows loading state when submitting */}
            <Button type="submit" className="w-full cursor-pointer bg-black text-white border border-black rounded-2xl px-6 py-3 font-semibold hover:bg-white hover:text-black transition-all duration-200" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
            {/* Error alert if signup fails or validation fails */}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
