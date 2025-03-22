import { getMenu } from "@/apis/admin";
import Image from "next/image";

const page = async () => {
  const data = await getMenu();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden  px-2 py-6 sm:gap-8 sm:py-20">
      <div className="fixed left-0 top-0 h-screen w-full bg-black bg-[url('/noise.png')] bg-repeat">
        <Image
          src="/spill/left.png"
          alt="Left"
          width={1000}
          height={1000}
          className="absolute bottom-0 left-0 top-0 my-auto w-96 opacity-30"
        />
        <Image
          src="/spill/right.png"
          alt="Right"
          width={1000}
          height={1000}
          className="absolute bottom-0 right-0 top-10 my-auto w-80 opacity-30"
        />
      </div>
      <div className="space-y-14">
        {data?.map((item) => (
          <div key={item.id} className="relative h-fit max-w-lg">
            <div className="absolute bottom-0 z-10 h-20 w-full translate-y-full bg-[url(/overlay.png)] bg-repeat-x "></div>
            <div className="absolute top-0 z-10 h-20 w-full -translate-y-full rotate-180 bg-[url(/overlay.png)] bg-repeat-x "></div>
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image}`}
              alt={item.image}
              className=" border-[1rem] border-white object-contain shadow-xl"
              width={1300}
              height={1300}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
