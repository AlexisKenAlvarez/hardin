import BotTop from "@/anim/BotTop";
import Image from "next/image";

const Hours2 = ({ formattedUrl }: { formattedUrl: string }) => {
  return (
    <div className="relative flex w-full items-center overflow-hidden bg-white px-10 py-20">
      <Image
        alt="Sketch"
        width={500}
        height={500}
        src="/sketch.png"
        className="absolute right-0 hidden h-full translate-x-1/4 lg:block "
      />
      <div className="mx-auto flex w-full max-w-screen-lg flex-col-reverse items-center justify-center gap-10 lg:flex-row">
        <div className=" w-full">
          <Image
            alt="Hours"
            width="500"
            height="500"
            src={formattedUrl}
            className="mx-auto block w-96"
          />
        </div>
        <div className="w-full space-y-2 text-center lg:text-left">
          <BotTop>
            <p className="font-sans text-lg font-bold text-orange">
              OPEN HOURS
            </p>
          </BotTop>
          <BotTop>
            <h1 className="header mx-auto max-w-md lg:mx-0">
              Join us at your convenience
            </h1>
          </BotTop>
          <BotTop>
            <p className="sub-header mx-auto max-w-xl">
              We are open everyday except Monday. Come and enjoy our coffee. We
              are located at{" "}
              <span className="font-bold underline">📌Taal Batangas</span>,
              beside Taal fire station.
            </p>
          </BotTop>
        </div>
      </div>
    </div>
  );
};

export default Hours2;
