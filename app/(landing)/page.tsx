import Heading from "./_components/Heading";
import Hero from "./_components/Hero";

export default function LandingPage() {
    return (
      <>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8" >
            <Heading/>
            <Hero/>
        </div>
      </div>
      </>
    )
  }