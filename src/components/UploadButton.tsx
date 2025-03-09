"use client";

import { cn } from "@/lib/utils";
import { Image as ImageIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import Cropper from "react-easy-crop";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface CroppedPixels {
  y: number;
  x: number;
  height: number;
  width: number;
}

interface UploadButtonProps {
  isImageMissing?: boolean;
  onImageUpload?: ({ image, name }: { image: string; name: string }) => void;
  label?: string;
}

const UploadButton = ({
  isImageMissing,
  onImageUpload,
  label,
}: UploadButtonProps) => {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [imgName, setImgName] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedPixels>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onCropComplete = (_: unknown, croppedAreaPixels: CroppedPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const clearInputImageData = () => {
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  };

  return (
    <>
      <div className="relative flex w-fit items-center gap-2">
        <Dialog open={cropping}>
          <DialogContent
            onInteractOutside={() => {
              setCropping(false);
              clearInputImageData();
            }}
          >
            <button
              className="absolute right-4 top-4"
              onClick={() => setCropping(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <DialogHeader>
              <DialogTitle>Crop the product image</DialogTitle>
              <DialogDescription>
                Resize and reposition the product.
              </DialogDescription>
            </DialogHeader>

            <div className="relative mt-4 h-96">
              {uploadedImage && (
                <Cropper
                  image={uploadedImage}
                  crop={crop}
                  zoom={zoom}
                  zoomSpeed={0.1}
                  style={{
                    cropAreaStyle: {
                      columnGap: "10px",
                    },
                    mediaStyle: {
                      scale: "0.96",
                    },
                  }}
                  aspect={
                    imageDimensions.height
                      ? imageDimensions.width / imageDimensions.height
                      : 1
                  } // Add default of 1
                  onMediaLoaded={({ naturalHeight, naturalWidth }) => {
                    console.log(naturalHeight, naturalWidth);
                    setImageDimensions({
                      height: naturalHeight ?? 0,
                      width: naturalWidth ?? 0,
                    });
                  }}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true} // Optional: shows grid lines for better visual guidance
                />
              )}
            </div>

            <Button
              onClick={async () => {
                const croppedImage = await getCroppedImg(
                  uploadedImage,
                  croppedAreaPixels,
                );

                setCropping(false);
                if (onImageUpload) {
                  onImageUpload({ image: croppedImage!, name: imgName });
                }
              }}
            >
              <span>Save</span>
            </Button>
          </DialogContent>
        </Dialog>

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={imageUploadRef}
          onChange={(e) => {
            try {
              if (e.target.files) {
                const image_file = e.target.files[0];
                const dateNow = new Date().toJSON();
                setImgName(`${dateNow}_${image_file?.name}`);

                const reader = new FileReader();
                if (image_file) {
                  reader.readAsDataURL(image_file);

                  reader.onload = (e) => {
                    const image_url = e.target?.result;
                    setUploadedImage(image_url as string);
                    setCropping(true);
                  };
                }
              }
            } catch (error) {
              console.log(error);
            }
          }}
          className="absolute z-10 h-full w-full cursor-pointer bg-black opacity-0"
        />
        <div className="rounded-lg bg-black/5 p-3">
          <ImageIcon className="" size={20} strokeWidth={1.5} />
        </div>

        <div className="  flex flex-col items-start justify-center text-xs">
          <div className="flex gap-1">
            <h1
              className={cn("font-bold", {
                "text-red-500": isImageMissing,
              })}
            >
              Choose File
            </h1>
            {isImageMissing && (
              <p className="text-xs text-red-500">
                &#40;Image is required&#41;
              </p>
            )}
          </div>
          <p className="text-primary/70">{label}</p>
        </div>
      </div>
    </>
  );
};

export default UploadButton;

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(
  width: number,
  height: number,
  rotation: number,
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false },
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");

  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    return null;
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  return croppedCanvas.toDataURL("image/jpeg", 80);
}
