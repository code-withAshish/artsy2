import { FormEventHandler, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AuthError } from "@supabase/supabase-js";
import { Terminal } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError | null>(null);
  const router = useIonRouter();

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error);
    } else {
      router.push("/home");
    }
    setLoading(false);
  };

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error);
    } else {
      router.push("/home");
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Auth</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {error && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>{error.name}</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <p className="text-center font-semibold text-3xl ">ARTSEE</p>
          <Tabs defaultValue="signin" className="p-5 w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>Sign In to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="w-full">
                      <Label htmlFor="email" aria-required>
                        Email address
                      </Label>
                      <Input
                        aria-required
                        id="email"
                        type="email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="passowrd" aria-required>
                        Password
                      </Label>
                      <Input
                        aria-required
                        id="password"
                        type="password"
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Button
                        className={"w-full"}
                        disabled={loading}
                        type={"submit"}
                      >
                        {loading ? <span>Loading</span> : <span>Sign In</span>}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Sign Up to your account</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <form className="space-y-5" onSubmit={handleSignUp}>
                    <div className="w-full">
                      <Label htmlFor="email" aria-required>
                        Email address
                      </Label>
                      <Input
                        aria-required
                        id="email"
                        type="email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="passowrd" aria-required>
                        Password
                      </Label>
                      <Input
                        aria-required
                        id="password"
                        type="password"
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <Button
                        className={"w-full"}
                        disabled={loading}
                        type={"submit"}
                      >
                        {loading ? <span>Loading</span> : <span>Sign Up</span>}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </IonContent>
    </IonPage>
  );
}
