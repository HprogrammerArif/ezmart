import NMContainer from "@/components/ui/core/NMContainer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const SportsHeroBanner = () => {
  return (
    <NMContainer className="py-12">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[1/1] sm:aspect-[5/4] md:aspect-square lg:aspect-[4/4] xl:aspect-[5/4] max-h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/sports-hero.png"
              alt="World Cup Kits"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Dark overlay to make text pop if we ever added text over the image, 
                but based on the screenshot, the image itself is just a graphic. */}
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <span className="text-red-600 font-semibold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
            New Drop Alert ‼️
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
            World Cup Kits Have Arrived 🎉
          </h1>
          <Link href="/products">
            <Button className="bg-[#111] hover:bg-black text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-transform hover:-translate-y-1">
              Get Geared Up For The New Season
            </Button>
          </Link>
        </div>
      </div>
    </NMContainer>
  );
};

export default SportsHeroBanner;
