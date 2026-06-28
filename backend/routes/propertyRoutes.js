const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  getSimilarProperties,
  updateProperty,
  deleteProperty,
  searchProperties,
  searchPropertiesCursor,
} = require("../controllers/propertyController");

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property Management APIs
 */

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - city
 *               - property_type
 *               - bedrooms
 *               - sqft
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Luxury Villa
 *               description:
 *                 type: string
 *                 example: Beautiful villa near the beach
 *               city:
 *                 type: string
 *                 example: Chennai
 *               property_type:
 *                 type: string
 *                 example: Villa
 *               bedrooms:
 *                 type: integer
 *                 example: 5
 *               sqft:
 *                 type: integer
 *                 example: 3000
 *               price:
 *                 type: number
 *                 example: 18000000
 *               image_url:
 *                 type: string
 *                 example: https://example.com/villa.jpg
 *     responses:
 *       201:
 *         description: Property created successfully
 *       401:
 *         description: Unauthorized
 */

// Create Property
router.post("/", authMiddleware, createProperty);

router.get("/my", authMiddleware, getMyProperties);

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: List of all properties
 */
// Get All Properties
router.get("/", getAllProperties);

/**
 * @swagger
 * /api/properties/search/filter:
 *   get:
 *     summary: Search and filter properties
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *
 *       - in: query
 *         name: property_type
 *         schema:
 *           type: string
 *         description: Filter by property type
 *
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *         description: Filter by number of bedrooms
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum property price
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum property price
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - newest
 *             - oldest
 *             - price_asc
 *             - price_desc
 *         description: Sorting option
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *
 *     responses:
 *       200:
 *         description: Filtered list of properties
 */
// Search Property
router.get("/search/filter", searchProperties);

router.get("/search/cursor", searchPropertiesCursor);

/**
 * @swagger
 * /api/properties/{id}/similar:
 *   get:
 *     summary: Get similar properties
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     responses:
 *       200:
 *         description: List of similar properties
 *       404:
 *         description: Property not found
 */
// Get Similar Properties
router.get("/:id/similar", getSimilarProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property details
 *       404:
 *         description: Property not found
 */
// Get Single Property
router.get("/:id", getPropertyById);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update an existing property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Luxury Villa
 *               description:
 *                 type: string
 *                 example: Updated Description
 *               city:
 *                 type: string
 *                 example: Chennai
 *               property_type:
 *                 type: string
 *                 example: Villa
 *               bedrooms:
 *                 type: integer
 *                 example: 5
 *               sqft:
 *                 type: integer
 *                 example: 3200
 *               price:
 *                 type: number
 *                 example: 20000000
 *               image_url:
 *                 type: string
 *                 example: https://example.com/villa.jpg
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 */
// Update Property
router.put("/:id", authMiddleware, updateProperty);


/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 */
// Delete Property
router.delete("/:id", authMiddleware, deleteProperty);


module.exports = router;