import { supabase } from "@/lib/supabaseClient";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";

const Explore: React.FC = () => {
  const [posts, setPosts] = useState<any>();

  useIonViewWillEnter(() => {
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
            <IonTitle size="large">Explore</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="p-2">
          <div className="grid grid-cols-3 gap-2 ">
            {posts?.data?.map((data: any) => {
              console.log(data);
              return (
                <IonImg src={data.image_url} className="border rounded-md" />
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Explore;
