import About from "@/views/landing/About";
import Hero from "@/views/landing/Hero";
import Hours from "@/views/landing/Hours";
import Location from "@/views/landing/Location";

const page = () => {
  return (
    <div className="relative">
      <Hero />
      <Location />

      <About />
      <Hours />
    </div>
  );
};

export default page;
