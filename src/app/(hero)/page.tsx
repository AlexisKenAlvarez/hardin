import { getHoursImage } from "@/apis/admin";
import BrewingSince from "@/app/(hero)/_brewing_since";
import Hero from "@/app/(hero)/_hero";
import Hours2 from "@/app/(hero)/_hours";
import Rental from "@/app/(hero)/_rental";
import SocialFeed from "@/app/(hero)/_socialfeed";
import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import Spill from "./_spill";
import { tryCatch } from "@/utils";
import JumpToTop from "@/components/JumpToTop";

const page = async () => {
  const { data: formattedUrl, error } = await tryCatch(getHoursImage());
  if (error) {
    console.log(error);
  }
  return (
    <ClientOnly>
      <div className="relative overflow-hidden">
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

        <JumpToTop />
      </div>
    </ClientOnly>
  );
};

export default page;
