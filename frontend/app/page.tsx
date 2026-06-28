
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative -mt-10 z-20">
        <SearchBar />
      </div>
      
      {/* Featured Properties */}
      <FeaturedProperties />
    </>
  );
}