import { LoaderCircle } from "lucide-react";
import Image from "next/image";

const loading = () => {
  return (
    <div className="grid h-screen w-full place-content-center bg-white">
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-2">
        <Image
          src="/logo-brown.png"
          alt="Logo"
          width={400}
          height={400}
          className="w-24"
        />
        <LoaderCircle className="animate-spin text-orange" />
      </div>
    </div>
  );
};

export default loading;
