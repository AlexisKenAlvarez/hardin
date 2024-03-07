import Nav from "@/components/Nav";
import Second from "@/views/Second";
import Hero from "@/views/Hero";
import About from "@/views/About";

const page = () => {
  return (

      <div className="relative" >
        <Nav />
        <Hero />
        <Second />
        <About />
        <div className="w-full min-h-screen grid place-content-center text-3xl bg-slate-50">
          Next section
        </div>
      </div>

  );
};

export default page;
