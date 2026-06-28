const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { inquiryLimiter } = require("../middleware/rateLimiter");

const { sendInquiry } = require("../controllers/inquiryController");

/**
 * @swagger
 * tags:
 *   name: Inquiries
 *   description: Property Inquiry APIs
 */

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Send an inquiry for a property
 *     tags: [Inquiries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - property_id
 *               - message
 *             properties:
 *               property_id:
 *                 type: integer
 *                 example: 4
 *               message:
 *                 type: string
 *                 example: I am interested in this property. Please contact me.
 *     responses:
 *       201:
 *         description: Inquiry sent successfully
 *       400:
 *         description: Duplicate inquiry or invalid request
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many inquiries
 */
router.post(
  "/",
  inquiryLimiter,
  authMiddleware,
  sendInquiry
);

module.exports = router;