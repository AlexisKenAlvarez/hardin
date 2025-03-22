import { getHoursImage } from "@/apis/admin";
import BrewingSince from "@/app/(hero)/_brewing_since";
import Hero from "@/app/(hero)/_hero";
import Hours2 from "@/app/(hero)/_hours";
import Rental from "@/app/(hero)/_rental";
import SocialFeed from "@/app/(hero)/_socialfeed";
import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import Spill from "./_spill";

const page = async () => {
  const formattedUrl = await getHoursImage();

  return (
    <ClientOnly>
      <div className="relative">
        <Hero />
        <div className="relative z-20">
          <Spill />
          <Rental />
          {/* <About /> */}
          <Hours2 formattedUrl={formattedUrl ?? ""} />
        </div>
        <BrewingSince />
        <div className="relative z-20">
          <SocialFeed />
        </div>
        <Footer />
      </div>
    </ClientOnly>
  );
};

export default page;
