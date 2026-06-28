import PropertyForm from "@/components/property/PropertyForm";

export default function CreatePropertyPage() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Add New Property
      </h1>

      <PropertyForm />
    </div>
  );
}