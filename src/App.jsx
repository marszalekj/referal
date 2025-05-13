import { useState } from 'react';
import Login from './Login';
import SignIn from './SignIn';
import WhoAmI from './WhoAmI';

function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  function handleLogin(user) {
    setUser(user);
  }

  function handleSignIn(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-4">Referal UI</h1>
        <WhoAmI user={user} onLogout={handleLogout} />
        {!user && (
          <>
            {showSignIn ? (
              <SignIn onSignIn={handleSignIn} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            <button
              className="mt-4 text-blue-600 hover:underline"
              onClick={() => setShowSignIn((v) => !v)}
            >
              {showSignIn ? 'Déjà un compte ? Se connecter' : "+ Créer un compte"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

