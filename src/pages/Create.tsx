import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { Terminal, UploadIcon } from "lucide-react";
import { useRef, useState } from "react";

const Create = () => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="p-2 flex flex-col gap-10 items-center justify-center h-full">
          {displayUrl && (
            <IonImg src={displayUrl} className="h-[300px] w-300px]" />
          )}
          <Input
            type="file"
            ref={uploadInputRef}
            hidden
            className="hidden"
            onChange={(event) => {
              const dataTransfer = new DataTransfer();

              const file = dataTransfer.files;
              const displayUrl = URL.createObjectURL(
                event.currentTarget.files![0]
              );

              console.log(file);
              setFile(event.currentTarget.files![0]);
              setDisplayUrl(displayUrl);
            }}
          />
          {uploadError && (
            <>
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Upload Error</AlertTitle>
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            </>
          )}
          <Input
            placeholder="Caption"
            onChange={(event) => {
              setCaption(event.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              uploadInputRef.current?.click();
            }}
          >
            <UploadIcon className="mr-2 h-4 w-4" /> Select Media
          </Button>

          <Button
            onClick={async () => {
              const fileFullName = file?.name.split(".");
              const fileName = fileFullName![0];
              const fileType = fileFullName![1];
              const uploadFileName = `${fileName}${new Date().toISOString()}.${fileType}`;
              const { error } = await supabase.storage
                .from("uploaded_images")
                .upload(`images/${uploadFileName}`, file!);

              if (error) {
                setUploadError(error.message);
                return;
              }

              const {
                data: { user },
              } = await supabase.auth.getUser();

              const {
                data: { publicUrl },
              } = supabase.storage
                .from("uploaded_images")
                .getPublicUrl(`images/${uploadFileName}`);

              const { data: postData, error: postError } = await supabase
                .from("post")
                .insert({
                  image_url: publicUrl,
                  caption: caption,
                  uploaded_by: user?.id,
                });

              if (postError) {
                setUploadError(error);
              } else {
                setFile(null);
                setCaption("");
                router.push("/home");
              }
            }}
          >
            Upload
          </Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Create;
