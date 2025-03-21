"use client";

import { getHours, uploadHours } from "@/apis/admin";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";

import HoursNode from "@/components/admin/HoursNode";
import { queryClient } from "@/components/providers/ReactQueryProvider";
import { useSession } from "@/components/providers/SupabaseSessionProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import UploadButton from "@/components/UploadButton";
import type { Database } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";


export interface OrderArray {
  slot: number;
  item: string
}

export type HoursItem = Database["public"]["Tables"]["open_hours"]["Row"]


const HoursView = () => {
  const session = useSession();
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [isImageMissing, setIsImageMissing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: hoursData, isPending: isMenuPending } = useQuery({
    queryKey: ["hoursData"],
    queryFn: () => getHours(),
  });

  const { mutate: uploadMenuMutation, isPending: isUploading } = useMutation({
    mutationFn: uploadHours,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hoursData"] });
      toast.success("Hours uploaded successfully");
      setUploadedImage("");
      setImageName("");
      setDialogOpen(false);
    },
  });

  return (
    <div className="flex flex-1 flex-col items-start gap-4 font-sans">
      <div className="flex w-full gap-2">
        <div
          key={"menu-view"}
          className="flex w-full gap-2"
        >
          <Dialog
            open={dialogOpen}
            onOpenChange={(e) => {
              if (!e) {
                setUploadedImage("");
                setImageName("");
              }
              setDialogOpen(e);
            }}
          >
            <Button
              className="flex items-center gap-2"
              onClick={() => setDialogOpen(true)}
            >
              <Plus />
              Add Image
            </Button>
            <DialogContent>
              <button
                className="absolute right-4 top-4"
                onClick={() => setDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
              <DialogHeader>
                <DialogTitle>Add open hours</DialogTitle>
                <DialogDescription>
                  Upload an image of the open hours
                </DialogDescription>
              </DialogHeader>

              <UploadButton
                isImageMissing={isImageMissing}
                label="Upload image"
                onImageUpload={({ image, name }) => {
                  setUploadedImage(image);
                  setImageName(name);
                  setIsImageMissing(false);
                }}
              />

              {uploadedImage && (
                <Image
                  src={uploadedImage ?? ""}
                  alt={imageName}
                  width={500}
                  height={500}
                />
              )}
              <Button
                className="w-full"
                disabled={isUploading || hoursData !== null}
                onClick={() => {
                  if (uploadedImage === "" || imageName === "") {
                    setIsImageMissing(true);
                    return;
                  }
                  uploadMenuMutation({
                    image: uploadedImage,
                    name: imageName,
                    uploaded_by: session?.user?.email ?? "",
                  });
                }}
              >
                {isUploading ? "Uploading..." : "Add to Hours"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full flex-1 flex-col border p-4">
        {isMenuPending ? (
          <div className="flex gap-2">
            <Skeleton className="h-96 w-72" />
            <Skeleton className="h-96 w-72" />
            <Skeleton className="h-96 w-72" />
          </div>
        ) : (
          <div className="h-full flex-1">
            {!hoursData ? (
              <div className="grid h-full flex-1 place-content-center">
                <h1 className="text-center text-black-secondary">No result.</h1>
              </div>
            ) : (
              <div
                className={cn("flex select-none flex-wrap gap-4")}
              >
                <HoursNode key={hoursData.id} item={hoursData} />

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoursView;
