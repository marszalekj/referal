import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import Login from './Login';
import SignIn from './SignIn';
import ApiDashboard from "./ApiDashboard";
import { Button } from "@/components/ui/button";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  function handleLogin(response) {
    setUser(response.user);
    setToken(response.token);
    // Rediriger vers la page d'accueil après login
    window.history.replaceState({}, '', '/');
  }

  function handleSignIn(response) {
    setUser(response.user);
    setToken(response.token);
    // Rediriger vers la page d'accueil après inscription
    window.history.replaceState({}, '', '/');
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center mb-4">Referal UI</h1>
          <Routes>
            <Route
              path="/login"
              element={
                user && token ? (
                  <Navigate to="/" replace />
                ) : (
                  <div>
                    {showSignIn ? (
                      <SignIn onSignIn={handleSignIn} />
                    ) : (
                      <Login onLogin={handleLogin} />
                    )}
                    <Button variant="outline"
                      onClick={() => setShowSignIn((v) => !v)}
                      className="mt-4"
                    >
                      {showSignIn ? 'Already have an account ? Log in' : "Don't have an account? Sign up"}
                    </Button>
                  </div>
                )
              }
            />
            <Route
              path="/"
              element={
                user && token ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-semibold">Bienvenue,</span>
                      <span className="text-blue-600">{user.email}</span>
                    </div>
                    <div className="flex gap-4">
                      <Button onClick={handleLogout} variant="outline">Log out</Button>
                      <Button asChild variant="outline" >
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                user && token ? (
                  <div>
                    <div className="flex gap-4 justify-end mb-4">
                      <Button onClick={handleLogout} variant="outline">Log out</Button>
                      <Button asChild variant="outline">
                        <Link to="/">Home</Link>
                      </Button>
                    </div>
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <span className="font-semibold">Connected as :</span>
                      <span className="text-blue-600">{user.email}</span>
                    </div>
                    <ApiDashboard token={token} />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Redirige toute autre route vers /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

