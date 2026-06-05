import NMContainer from "@/components/ui/core/NMContainer";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "New Arrivals",
    image: "https://images.unsplash.com/photo-1508061253366-206037ba4515?q=80&w=400&auto=format&fit=crop",
    link: "/products",
  },
  {
    title: "Best Sellers",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&auto=format&fit=crop",
    link: "/products",
  },
  {
    title: "25/26 Season",
    image: "https://images.unsplash.com/photo-1600181516290-7603612d78bf?q=80&w=400&auto=format&fit=crop",
    link: "/products",
  },
  {
    title: "National",
    image: "https://images.unsplash.com/photo-1522778526582-1c2518e3820a?q=80&w=400&auto=format&fit=crop",
    link: "/products",
  },
  {
    title: "Retro",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=400&auto=format&fit=crop",
    link: "/products",
  },
  {
    title: "Stussy Kits",
    image: "https://images.unsplash.com/photo-1610419363148-3a99268d8ef5?q=80&w=400&auto=format&fit=crop",
    link: "/products",
  },
];

const SportsTopCollections = () => {
  return (
    <NMContainer className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Top Collections</h2>
        <p className="text-gray-500 text-sm">Show Your Passion With Our Elite Selections!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {collections.map((collection, idx) => (
          <Link href={collection.link} key={idx} className="group flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4 relative shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="font-bold text-[15px] text-gray-900">{collection.title}</h3>
          </Link>
        ))}
      </div>
    </NMContainer>
  );
};

export default SportsTopCollections;
