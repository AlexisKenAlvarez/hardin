import Nav from "@/components/Nav";
import Wrappers from "@/components/Wrappers";
import About from "@/views/About";
import Hero from "@/views/Hero";

const page = () => {
  return (
    <Wrappers>
      <div className="relative">
        <Nav />
        <Hero />
        <About />
      </div>
    </Wrappers>
  );
};

export default page;
