const { faker } = require("@faker-js/faker");
const pool = require("../db/db");

const cities = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Coimbatore",
  "Madurai",
  "Delhi",
  "Noida",
  "Kochi",
];

const propertyTypes = [
  "Apartment",
  "House",
  "Villa",
  "Land",
];

const imageUrls = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
];

function generateProperty() {

    const type =
        faker.helpers.arrayElement(propertyTypes);

    return {

        user_id:
            faker.number.int({ min: 1, max: 5 }),

        title:
            faker.location.city() +
            " " +
            type,

        description:
            faker.lorem.sentences(3),

        city:
            faker.helpers.arrayElement(cities),

        property_type:
            type,

        bedrooms:
            type === "Land"
                ? 0
                : faker.number.int({
                      min: 1,
                      max: 5,
                  }),

        sqft:
            faker.number.int({
                min: 600,
                max: 5000,
            }),

        price:
            faker.number.int({
                min: 2500000,
                max: 50000000,
            }),

        image_url:
            faker.helpers.arrayElement(imageUrls),

    };
}

async function seedProperties(totalRecords = 100) {
  try {
    console.log(`Generating ${totalRecords} properties...`);

    const batchSize = 500;

    for (let i = 0; i < totalRecords; i += batchSize) {
      const values = [];
      const placeholders = [];

      const currentBatch = Math.min(batchSize, totalRecords - i);

      for (let j = 0; j < currentBatch; j++) {
        const property = generateProperty();

        const index = j * 9;

        placeholders.push(
          `($${index + 1}, $${index + 2}, $${index + 3}, $${index + 4}, $${index + 5}, $${index + 6}, $${index + 7}, $${index + 8}, $${index + 9})`
        );

        values.push(
          property.user_id,
          property.title,
          property.description,
          property.city,
          property.property_type,
          property.bedrooms,
          property.sqft,
          property.price,
          property.image_url
        );
      }

      await pool.query(
        `
        INSERT INTO properties
        (
          user_id,
          title,
          description,
          city,
          property_type,
          bedrooms,
          sqft,
          price,
          image_url
        )
        VALUES
        ${placeholders.join(",")}
        `,
        values
      );

      console.log(
        `Inserted ${Math.min(i + batchSize, totalRecords)} / ${totalRecords}`
      );
    }

    console.log("✅ Property seeding completed.");

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
}
seedProperties(50000);