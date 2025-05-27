import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function WhoAmI({ user, onLogout }) {
  if (!user) return null;
  return (
    <div className="flex justify-center items-center w-full my-8">
      <Card className="w-full max-w-xs bg-white border border-black rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] px-8 py-10 flex flex-col items-center">
        <CardHeader className="w-full flex flex-col items-center mb-8">
  <CardTitle className="text-center text-3xl font-extrabold tracking-tight font-sans text-black mb-2">User Profile</CardTitle>
</CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <span className="font-semibold">Connecté en tant que :</span>
          <span className="text-blue-600">{user.email}</span>
          <Button className="w-full bg-black text-white border border-black rounded-2xl px-6 py-3 font-semibold hover:bg-white hover:text-black transition-all duration-200 cursor-pointer" onClick={onLogout}>Log out</Button>
        </CardContent>
      </Card>
    </div>
  );
}
