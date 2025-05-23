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
    <div className="flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card container for the sign up form */}
      <Card className="w-full max-w-sm bg-white border border-black/10 shadow-none rounded-lg">
        {/* Card header with title */}
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Sign up form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                className="bg-white text-black border border-black placeholder-gray-500 focus:ring-black/30 rounded-lg"
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
                className="bg-white text-black border border-black placeholder-gray-500 focus:ring-black/30 rounded-lg"
              />
            </div>
            {/* Submit button, shows loading state when submitting */}
            <Button type="submit" className="w-full cursor-pointer bg-black text-white border border-black hover:bg-gray-900 rounded-lg" disabled={loading}>
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
