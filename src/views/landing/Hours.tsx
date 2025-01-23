import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <div className="relative z-20 flex min-h-[40rem] w-full flex-col items-center justify-center rounded-tl-[8rem] rounded-tr-[8rem] bg-white px-10 py-20">
      <div className="space-y-2">
        <div className="drop-shadow-md w-fit px-8 mx-auto py-2 rounded-full bg-slate-100/40 border-white border-2">
          <h1 className="font-sans text-black-secondary text-sm font-medium">Open hours</h1>
        </div>
        <h1 className="text-black-primary text-center font-secondary text-5xl  font-medium">
          Join us at your <br />
          convenience
        </h1>
        <p className="text-black-secondary font-sans">
          We are open everyday except Monday. Come and enjoy our coffee.
        </p>
      </div>

      <ul className="mt-32 flex flex-wrap items-center justify-center gap-8">
        {HOURS.map((item, index) => (
          <li
            key={index}
            className={cn(
              "relative flex h-72 w-72 flex-col items-center justify-center rounded-[5rem] border bg-white p-2 text-[#1D4861]",
            )}
          >
            <Image
              alt={item.label}
              width={900}
              height={900}
              src={`/hours/${index + 1}.png`}
              className="absolute -top-32 mt-4 w-72 object-contain"
            />
            <span className="w-40 text-center font-secondary text-3xl italic">
              {item.label}
            </span>

            <span
              className={cn("text-md mt-5 font-sans font-medium", {
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
