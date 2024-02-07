import AdminLogin from "@/components/AdminLogin";
import Image from "next/image";

const page = () => {
  return (
    <section className="relative min-h-screen w-full">
      <Image
        src="/background.webp"
        alt="Background"
        width={1500}
        height={1500}
        className="absolute left-0 top-0 h-full w-full object-cover object-bottom"
      />
      {/* <h1 className="text-black text-5xl relative z-10">Hello</h1> */}
      <div className="relative w-full h-screen flex items-center flex-col justify-center">
        <AdminLogin />
      </div>
    </section>
  );
};

export default page;
