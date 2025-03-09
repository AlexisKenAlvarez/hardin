import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import About from "@/app/(hero)/_about";
import Categories from "@/app/(hero)/_categories";
import Hero from "@/app/(hero)/_hero";
import Hours2 from "@/app/(hero)/_hours";
import NewsLetter from "@/app/(hero)/_newsletter";
import Rental from "@/app/(hero)/_rental";

const page = () => {
  return (
    <ClientOnly>
      <div className="relative">
        <Nav />
        <Hero />
        <div className="relative z-20">
          <About />
          <Rental />
          <Categories />
          <Hours2 />
          <NewsLetter />
        </div>

        <Footer />
      </div>
    </ClientOnly>
  );
};

export default page;
