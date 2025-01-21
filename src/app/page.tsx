import Nav from "@/components/Nav";
import About from "@/views/landing/About";
import Hero from "@/views/landing/Hero";
import Hours from "@/views/landing/Hours";

const page = () => {
  return (
    <div className="relative">
      {/* <Nav /> */}
      <Hero />
      <Hours />
      {/* <Second /> */}
      <About />
      {/* <Location/> */}
    </div>
  );
};

export default page;
