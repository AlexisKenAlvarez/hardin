import Image from "next/image";

const Hours2 = () => {
  return (
    <div className="relative flex w-full items-center bg-white py-20 overflow-hidden drop-shadow-xl">
      <Image alt="Sketch" width={500} height={500} src="/sketch.png" className="h-full absolute right-0 translate-x-1/4" />
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-center gap-10">
        <div className=" w-full">
          <Image
            alt="Hours"
            width="500"
            height="500"
            src="/hours_image.png"
            className="mx-auto block w-96"
          />
        </div>
        <div className="w-full space-y-2 ">
          <p className="font-sans text-lg font-bold text-orange">OPEN HOURS</p>
          <h1 className="header max-w-md">Join us at your convenience</h1>
          <p className="sub-header mx-auto max-w-xl">
            We are open everyday except Monday. Come and enjoy our coffee. We are located at{" "}
            <span className="font-bold underline">📌Taal Batangas</span>
            , beside Taal fire station.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hours2;
