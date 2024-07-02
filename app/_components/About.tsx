import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="">
      <div className="text-4xl md:my-5 md:flex justify-center font-bold font-unkempt ">
        <div className="md:w-2/3">About Us</div>
      </div>
      <div className="flex p-3 md:flex-row flex-col-reverse items-center justify-center gap-5">
        <div className="md:w-1/2 flex items-center justify-center flex-col gap-10">
          <Image
            src={"/assets/svg/aboutusdoodle.svg"}
            alt="logo"
            className="md:scale-125"
            width={200}
            height={200}
          />
        </div>
        <div className="md:w-1/2">
          Welcome to the VPMP Alumni Page! Our esteemed institution, VPMP
          College, has a proud history of producing exceptional engineers who
          have excelled in various fields. From cutting-edge technology and
          innovative startups to influential roles in established industries,
          our alumni have consistently demonstrated excellence and leadership.
          Join us in celebrating the achievements of our distinguished graduates
          and stay connected with the vibrant VPMP community.
        </div>
      </div>
      <div id="about" className="hidden"></div>
    </div>
  );
}
