"use client";

import InquiryForm from "@/components/inquiry/InquiryForm";

export default function PropertySidebar({ property }) {
  return (
    <aside className="sticky top-24">

      <div className="bg-white border rounded-2xl shadow-lg p-6">

        
        <InquiryForm propertyId={property.id} />

      </div>

    </aside>
  );
}