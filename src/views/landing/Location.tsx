import { DotPattern } from "@/components/ui/dot-pattern";
import Safari from "@/components/ui/safari";

const Location = () => {
  return (
    <section className="relative min-h-screen w-full rounded-tl-[8rem] rounded-tr-[8rem] bg-white py-20 px-10">
      <div className=" text-center">
        <DotPattern
          style={{
            maskImage:
              "radial-gradient(470px 180px at center, white, transparent)",
            WebkitMaskImage:
              "radial-gradient(470px 180px at center, white, transparent)",
          }}
          className={"absolute -top-72"}
        />

        <div className="space-y-2">
          <div className="relative z-10 mx-auto w-fit rounded-full border-2 border-white bg-slate-100/20 px-8 py-2 drop-shadow-md backdrop-blur-[1px]">
            <h1 className="font-sans text-sm font-medium  text-black-secondary">
              Location
            </h1>
          </div>
          <h1 className="relative z-10 text-center font-secondary text-5xl font-medium  text-black-primary">
            Visit us at our <br />
            location
          </h1>
          <p className="font-sans text-black-secondary">
            We are located at 1234 Coffee Street, Coffeeville, Coffee County.
          </p>
        </div>
      </div>

      <Safari url="hardincafe.com" className="mx-auto mt-16">
        <iframe
          className="h-full w-full"
          src="https://my.atlist.com/map/b808a1cc-921a-4612-a38b-13b051199775?share=true"
          allow="geolocation 'self' https://my.atlist.com"
          loading="lazy"
          frameBorder="0"
          allowFullScreen
          id="atlist-embed"
        ></iframe>
      </Safari>
    </section>
  );
};

export default Location;
