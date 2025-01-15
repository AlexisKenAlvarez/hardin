import Nav from "@/components/Nav";
import Second from "@/views/Second";
import Hero from "@/views/Hero";
import About from "@/views/About";
// import Location from "@/views/Location";

const page = () => {
  return (

      <div className="relative" >
        <Nav />
        <Hero />
        {/* <Second /> */}
        <About />
        {/* <Location/> */}
      </div>

  );
};

export default page;
