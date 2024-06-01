import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { User, UserResponse } from "@supabase/supabase-js";
import { PowerCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [posts, setPosts] = useState<any>();
  const [user, setUser] = useState<string>();

  const router = useIonRouter();

  useIonViewWillEnter(() => {
    supabase.auth.getUser().then((userData) => {
      setUser(userData.data.user?.id);
      console.log(userData.data.user?.id);
    });

    supabase
      .from("post")
      .select("image_url")
      .then((postData) => {
        setPosts(postData);
        console.log(postData);
      });
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="p-2 space-y-10">
          <Button
            variant="outline"
            size="icon"
            className="w-full"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
          >
            <PowerCircle className="h-4 w-4" />
          </Button>
          <div className="flex flex-row items-center  gap-10 justify-between p-5">
            <Avatar className="h-[150px] w-[150px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="">
              <p className="font-bold text-lg text-center">
                {posts?.data.length}
              </p>
              <br />
              <p className="text-3xl font-semibold">Posts</p>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-20">
            {posts?.data?.map((data: any) => {
              console.log(data);
              return <IonImg src={data.image_url} />;
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
