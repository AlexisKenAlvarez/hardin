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
    label: "Sunday",
    time: "2:00 PM - 12:00 AM",
  },
];

const Hours = () => {
  return (
    <div className="relative z-20 flex py-20 min-h-[40rem] w-full flex-col items-center justify-center px-10">
      <h1 className="text-center font-sans text-lg font-semibold text-white">
        HARDIN CAFE HOURS
      </h1>

      <ul className="mt-8 flex items-center justify-center flex-wrap gap-8">
        {HOURS.map((item, index) => (
          <li
            key={index}
            className={cn(
              "flex h-56 w-48 flex-col items-center justify-start rounded-3xl bg-white p-2 text-[#1D4861]",
            )}
          >
            <Image
              alt={item.label}
              width={100}
              height={100}
              src={`/hours/${index + 1}.png`}
              className="mt-4 w-20"
            />
            <span className="w-24 text-center font-secondary text-xl italic">
              {item.label}
            </span>

            <span
              className={cn("mt-5 font-sans text-sm", {
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
