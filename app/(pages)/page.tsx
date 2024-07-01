import Image from "next/image";
import AlumniCard from "../_components/Cards/AlumniCard";

export default function Home() {
  return (
    <>
      <div className="absolute md:left-[10%] left-0 md:top-40 -bottom-10 rotate-[-25deg] w-fit">
        <AlumniCard
          name="Shreya Sharma ~ 2016"
          position="Founder NexaCoreTech"
          src="/assets/images/shreya.jpg"
        />
      </div>
      <div className="absolute md:right-[10%] -right-10 md:top-16 top-0 rotate-[25deg] w-fit">
        <AlumniCard
          name="Rashesh Saraiya ~ 2008"
          position="Dev @amazon/USA"
          src="/assets/images/rashesh.jpg"
        />
      </div>
      <div className="container relative z-10 md:backdrop-blur-0 backdrop-blur-md text-center min-h-screen mx-auto flex-col flex items-center justify-center">
        <div className="text-5xl font-unkempt ">VPMP</div>
        <div
          style={{ lineHeight: "0.8" }}
          className="text-7xl  font-ultra  font-extrabold"
        >
          Alumni <br /> Portal
        </div>
      </div>
    </>
  );
}
