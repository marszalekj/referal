export default function WhoAmI({ user, onLogout }) {
  if (!user) return null;
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <span className="font-semibold">Connecté en tant que :</span>
      <span className="text-blue-600">{user.email}</span>
      <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Se déconnecter</button>
    </div>
  );
}
