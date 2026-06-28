const pool = require("../db/db");

// CREATE PROPERTY
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      property_type,
      bedrooms,
      sqft,
      price,
      image_url,
    } = req.body;

    // Validation
if (
  !title ||
  !description ||
  !city ||
  !property_type
) {
  return res.status(400).json({
    success: false,
    message: "Please fill all required fields.",
  });
}

if (Number(price) <= 0) {
  return res.status(400).json({
    success: false,
    message: "Price must be greater than 0.",
  });
}

if (Number(bedrooms) < 0) {
  return res.status(400).json({
    success: false,
    message: "Bedrooms cannot be negative.",
  });
}

if (Number(sqft) <= 0) {
  return res.status(400).json({
    success: false,
    message: "Area must be greater than 0.",
  });
}

  
    const result = await pool.query(
      `INSERT INTO properties
      (user_id, title, description, city, property_type, bedrooms, sqft, price, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        req.user.id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const query = `
      SELECT
        id,
        user_id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        created_at
      FROM properties
      ORDER BY id DESC
    `;

    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      properties: result.rows,
    });

  } catch (error) {
    console.error("Get All Properties Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyProperties = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        user_id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        created_at
      FROM properties
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      properties: result.rows,
    });

  } catch (error) {
    console.error("Get My Properties Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT
        id,
        user_id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        created_at
      FROM properties
      WHERE id = $1
      LIMIT 1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property: result.rows[0],
    });

  } catch (error) {
    console.error("Get Property By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getSimilarProperties = async (req, res) => {
  try {
    const { id } = req.params;

    // Get current property
    const propertyResult = await pool.query(
      `
      SELECT city, property_type, bedrooms
      FROM properties
      WHERE id = $1
      `,
      [id]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const { city, property_type, bedrooms } = propertyResult.rows[0];

    // Find similar properties
    const similarResult = await pool.query(
      `
      SELECT
        id,
        user_id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        created_at
      FROM properties
      WHERE
        city = $1
        AND property_type = $2
        AND bedrooms = $3
        AND id <> $4
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [city, property_type, bedrooms, id]
    );

    res.status(200).json({
      success: true,
      count: similarResult.rows.length,
      properties: similarResult.rows,
    });

  } catch (error) {
    console.error("Similar Properties Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      city,
      property_type,
      bedrooms,
      sqft,
      price,
      image_url,
    } = req.body;

    // Validation
if (
  !title ||
  !description ||
  !city ||
  !property_type
) {
  return res.status(400).json({
    success: false,
    message: "Please fill all required fields.",
  });
}

if (Number(price) <= 0) {
  return res.status(400).json({
    success: false,
    message: "Price must be greater than 0.",
  });
}

if (Number(bedrooms) < 0) {
  return res.status(400).json({
    success: false,
    message: "Bedrooms cannot be negative.",
  });
}

if (Number(sqft) <= 0) {
  return res.status(400).json({
    success: false,
    message: "Area must be greater than 0.",
  });
}


    const result = await pool.query(
      `UPDATE properties
      SET
      title=$1,
      description=$2,
      city=$3,
      property_type=$4,
      bedrooms=$5,
      sqft=$6,
      price=$7,
      image_url=$8
      WHERE id=$9
      AND user_id=$10
      RETURNING *`,
      [
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        id,
        req.user.id,
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found or you are not authorized.",
      }
    );
}

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchProperties = async (req, res) => {
  try {
    const {
      city,
      property_type,
      bedrooms,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    let query = `
      SELECT
        id,
        user_id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        created_at
      FROM properties
      WHERE 1=1
    `;

    const values = [];

    if (city) {
      values.push(city);
      query += ` AND city = $${values.length}`;
    }

    if (property_type) {
      values.push(property_type);
      query += ` AND property_type = $${values.length}`;
    }

    if (bedrooms) {
      values.push(Number(bedrooms));
      query += ` AND bedrooms = $${values.length}`;
    }

    if (minPrice) {
      values.push(Number(minPrice));
      query += ` AND price >= $${values.length}`;
    }

    if (maxPrice) {
      values.push(Number(maxPrice));
      query += ` AND price <= $${values.length}`;
    }

    switch (sort) {
      case "price_asc":
        query += ` ORDER BY price ASC`;
        break;

      case "price_desc":
        query += ` ORDER BY price DESC`;
        break;

      case "newest":
        query += ` ORDER BY created_at DESC`;
        break;

      case "oldest":
        query += ` ORDER BY created_at ASC`;
        break;

      default:
        query += ` ORDER BY id DESC`;
    }

    values.push(limitNumber);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    // Get total matching records (without pagination)
let countQuery = `
  SELECT COUNT(*) AS total
  FROM properties
  WHERE 1=1
`;

const countValues = [];

if (city) {
  countValues.push(city);
  countQuery += ` AND city = $${countValues.length}`;
}

if (property_type) {
  countValues.push(property_type);
  countQuery += ` AND property_type = $${countValues.length}`;
}

if (bedrooms) {
  countValues.push(Number(bedrooms));
  countQuery += ` AND bedrooms = $${countValues.length}`;
}

if (minPrice) {
  countValues.push(Number(minPrice));
  countQuery += ` AND price >= $${countValues.length}`;
}

if (maxPrice) {
  countValues.push(Number(maxPrice));
  countQuery += ` AND price <= $${countValues.length}`;
}

const countResult = await pool.query(countQuery, countValues);

const totalRecords = Number(countResult.rows[0].total);

const totalPages = Math.ceil(totalRecords / limitNumber);

   res.status(200).json({
  success: true,

  pagination: {
    page: pageNumber,
    limit: limitNumber,
    totalRecords,
    totalPages,
    hasNextPage: pageNumber < totalPages,
    hasPreviousPage: pageNumber > 1,
  },

  count: result.rows.length,

  properties: result.rows,
});

  } catch (error) {
    console.error("Search Properties Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchPropertiesCursor = async (req, res) => {
  try {
    const {
      city,
      property_type,
      bedrooms,
      lastId,
      limit = 6,
    } = req.query;

    let query = `
      SELECT
        id,
        user_id,
        title,
        description,
        city,
        property_type,
        bedrooms,
        sqft,
        price,
        image_url,
        created_at
      FROM properties
      WHERE 1=1
    `;

    const values = [];

    if (city) {
      values.push(city);
      query += ` AND city = $${values.length}`;
    }

    if (property_type) {
      values.push(property_type);
      query += ` AND property_type = $${values.length}`;
    }

    if (bedrooms) {
      values.push(Number(bedrooms));
      query += ` AND bedrooms = $${values.length}`;
    }

    if (lastId) {
      values.push(Number(lastId));
      query += ` AND id < $${values.length}`;
    }

    values.push(Number(limit));

    query += `
      ORDER BY id DESC
      LIMIT $${values.length}
    `;

    const result = await pool.query(query, values);

    res.json({
      success: true,
      nextCursor:
        result.rows.length > 0
          ? result.rows[result.rows.length - 1].id
          : null,
      properties: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM properties
      WHERE id = $1
      AND user_id = $2
      RETURNING *`,
      [
        id,
        req.user.id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found or you are not authorized.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

console.log({
   createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  getSimilarProperties,
  updateProperty,
  deleteProperty,
  searchProperties,
});

module.exports = {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  getSimilarProperties,
  updateProperty,
  deleteProperty,
  searchProperties,
  searchPropertiesCursor,
};
