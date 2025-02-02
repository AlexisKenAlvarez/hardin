import { cn } from "@/lib/utils";
import Image from "next/image";
import { DotPattern } from "@/components/ui/dot-pattern";

const HOURS = [
  {
    label: "Tuesday to Thursday",
    time: "2:00 PM - 12:00 AM",
  },
  {
    label: "Friday and Saturday",
    time: "2:00 PM - 2:00 AM",
  },
  {
    label: "Every Sunday",
    time: "2:00 PM - 12:00 AM",
  },
];

const Hours = () => {
  return (
    <div className="relative z-20  flex min-h-[40rem] w-full flex-col items-center justify-center  bg-white px-10 py-20 pt-28">
      <div className="space-y-2">
        <DotPattern
          style={{
            maskImage:
              "radial-gradient(470px 180px at center, white, transparent)",
            WebkitMaskImage:
              "radial-gradient(470px 180px at center, white, transparent)",
          }}
          className={cn("absolute -top-96 sm:-top-72 md:-top-44")}
        />

        <div className="relative z-10 mx-auto w-fit rounded-full border-2 border-white bg-slate-100/20 px-8 py-2 drop-shadow-md backdrop-blur-[1px]">
          <h1 className="font-sans text-sm font-medium  text-black-secondary">
            Open hours
          </h1>
        </div>
        <h1 className="relative z-10 text-center mx-auto font-secondary header font-medium  text-black-primary">
          Join us at your <br />
          convenience
        </h1>
        <p className="font-sans text-black-secondary text-center">
          We are open everyday except Monday. Come and enjoy our coffee.
        </p>
      </div>

      <ul className="mt-32 flex flex-wrap items-center justify-center gap-8 gap-y-20">
        {HOURS.map((item, index) => (
          <li
            key={index}
            className={cn(
              "relative flex md:h-72 md:w-72 w-60 h-60 flex-col items-center justify-center rounded-[4rem] sm:rounded-[5rem] border bg-white p-2 text-[#1D4861]",
            )}
          >
            <Image
              alt={item.label}
              width={900}
              height={900}
              src={`/hours/${index + 1}.png`}
              className="absolute -top-24 md:-top-32 mt-4 w-60 md:w-72 object-contain"
            />
            <span className="w-40 text-center font-secondary text-2xl md:text-3xl italic">
              {item.label}
            </span>

            <span
              className={cn("text-md mt-2 md:mt-5 font-sans font-medium", {
                "mt-12": item.label === "Sunday",
              })}
            >
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hours;
