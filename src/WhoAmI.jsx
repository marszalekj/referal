import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function WhoAmI({ user, onLogout }) {
  if (!user) return null;
  return (
    <div className="flex justify-center items-center w-full my-8">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle className="text-center">Profil utilisateur</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <span className="font-semibold">Connecté en tant que :</span>
          <span className="text-blue-600">{user.email}</span>
          <Button variant="destructive" className="w-full" onClick={onLogout}>Se déconnecter</Button>
        </CardContent>
      </Card>
    </div>
  );
}
