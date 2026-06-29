const pool = require("../db/db");

// Send Inquiry
const sendInquiry = async (req, res) => {
  try {
    const { property_id, message } = req.body;
    
    // Validation
    if (!property_id || !message) {
      return res.status(400).json({
        success: false,
        message: "Property ID and message are required",
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must contain at least 10 characters",
      });
    }

    // Find Property Owner
    const propertyResult = await pool.query(
      `
      SELECT user_id
      FROM properties
      WHERE id = $1
      `,
      [property_id]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const owner_id = propertyResult.rows[0].user_id;

    // Prevent duplicate inquiry
    const duplicate = await pool.query(
      `
      SELECT id
      FROM property_inquiries
      WHERE property_id = $1
      AND sender_id = $2
      `,
      [property_id, req.user.id]
    );

    if (duplicate.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already sent an inquiry for this property.",
      });
    }

    // Save inquiry
    const result = await pool.query(
      `
      INSERT INTO property_inquiries
      (
        property_id,
        sender_id,
        owner_id,
        message
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        property_id,
        req.user.id,
        owner_id,
        message,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      inquiry: result.rows[0],
    });

  } catch (error) {
    console.error("Send Inquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendInquiry,
};
