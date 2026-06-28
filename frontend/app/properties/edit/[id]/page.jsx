import PropertyForm from "@/components/property/PropertyForm";

export default async function EditPropertyPage({ params }) {
  const { id } = await params;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">
        Edit Property
      </h1>

      <PropertyForm propertyId={id} />
    </div>
  );
}