import Image from "next/image";
import AlumniCard from "../_components/Cards/AlumniCard";
import About from "../_components/About";
import RenderAlumni from "../_components/RenderAlumni";
import Form from "../_components/Form";
import Featured from "../_components/Featured";
export default function Home() {
  return (
    <>
      <div
        id=""
        className="relative md:min-h-[80vh] min-h-screen flex items-center justify-center"
      >
        <div>
          <Image
            src={"/assets/svg/face.svg"}
            className="absolute hidden md:block right-[30%] scale-90 top-16"
            alt="logo"
            width={200}
            height={200}
          />
          <Image
            src={"/assets/svg/doodle.svg"}
            className="absolute hidden md:block scale-[1.8] left-[26%] top-16"
            alt="logo"
            width={200}
            height={200}
          />
          <Image
            src={"/assets/svg/bulb.svg"}
            className="absolute block  md:scale-[0.5] bottom-20 rotate-45  scale-[30%] md:right-[30%] md:left-auto left-0  md:-bottom-10"
            alt="logo"
            width={200}
            height={200}
          />
          <Image
            src={"/assets/svg/homepagearrow.svg"}
            className="absolute block  md:scale-[1] bottom-20  scale-[100%] md:left-[25%] right-24 md:-bottom-10"
            alt="logo"
            width={200}
            height={200}
          />
          <div className="absolute md:right-36 md:left-auto md:rotate-[25deg]  -right-3 md:top-12  scale-[0.45] md:scale-90   -top-0 rotate-[-25deg] w-fit">
            <AlumniCard
              name="Shreya Sharma ~ 2016"
              position="Founder NexaCoreTech"
              src="/assets/images/shreya.jpg"
            />
          </div>
          <div className="absolute md:left-36 -left-3 md:right-auto md:rotate-[-25deg] scale-[0.55] md:scale-[0.8] md:top-12 -top-12 rotate-[15deg] w-fit">
            <AlumniCard
              name="Rashesh Saraiya ~ 2008"
              position="Dev @amazon/USA"
              src="/assets/images/rashesh.jpg"
            />
          </div>
        </div>
        <div className="container relative z-10 md:backdrop-blur-0  text-center  mx-auto flex-col flex items-center justify-center">
          <div className="text-5xl font-unkempt ">VPMP</div>
          <div
            style={{ lineHeight: "0.8" }}
            className="text-7xl  font-ultra  font-extrabold"
          >
            Alumni <br /> Portal
          </div>
        </div>
      </div>
      <div className="md:my-16 container mx-auto md:px-10 px-5">
        <About />
      </div>
 <div className="md:my-16 container mx-auto md:px-10 px-5">

        <div id="alumni"></div>
        <Featured />
      </div>

      <div className="md:my-16 container mx-auto md:px-10 px-5">

        <div id="alumni"></div>
        <RenderAlumni />
      </div>
      <div className="md:my-16 container mx-auto md:px-10 px-5">
        
        <div id="apply"></div>
        <Form />
      </div>
    </>
  );
}
