import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function WhoAmI({ user, onLogout }) {
  if (!user) return null;
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <span className="font-semibold">Connected as :</span>
      <span className="text-blue-600">{user.email}</span>
      <Button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Log out</Button>
    </div>
  );
}
