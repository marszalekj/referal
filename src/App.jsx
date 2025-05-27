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
                  <div className="flex flex-col min-h-[80vh] items-center justify-center bg-white px-4">
  <div className="w-full max-w-md bg-white border border-black rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] px-8 py-10 flex flex-col items-center">
    <div className="w-full flex flex-col items-center mb-8">
      <span className="text-4xl font-extrabold tracking-tight font-sans text-black mb-2 text-center">Welcome</span>
      <span className="text-gray-700 text-lg text-center">{user.email}</span>
    </div>
    <div className="flex flex-row flex-wrap gap-4 min-w-0 justify-center">
  <Button onClick={handleLogout} className="bg-black text-white border border-black rounded-2xl px-6 py-3 font-semibold hover:bg-white hover:text-black transition-all duration-200">Log out</Button>
  <Button asChild className="bg-black text-white border border-black rounded-2xl px-6 py-3 font-semibold hover:bg-white hover:text-black transition-all duration-200">
    <Link to="/dashboard">Dashboard</Link>
  </Button>
</div>
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
                      <Button onClick={handleLogout} variant="outline" className="cursor-pointer">Log out</Button>
                      <Button asChild variant="outline" className="cursor-pointer">
                        <Link to="/">Home</Link>
                      </Button>
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

