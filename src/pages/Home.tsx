import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any>();
  useIonViewWillEnter(() => {
    supabase
      .from("post")
      .select("*")
      .order("created_at", { ascending: false })
      .then((postData) => {
        console.log(postData);
        setPosts(postData.data);
      });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="p-4 pt-5 space-y-4">
          {posts?.map((data: any) => (
            <Card>
              <CardContent className="p-2">
                <IonImg src={data?.image_url} />
              </CardContent>
              <CardFooter>
                <p className="font-semibold p-2 -mb-4">{data?.caption}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
