
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PropertyCategories from "@/components/home/PropertyCategories";

export default function HomePage() {
  return (
    <>
    <Hero />
    <div className="relative -mt-10 z-20">
      <SearchBar />
      </div>
      
      <PropertyCategories />
      
      {/* Featured Properties */}
      <FeaturedProperties />

    </>
  );
}