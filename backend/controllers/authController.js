const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("JWT_REFRESH_SECRET =", process.env.JWT_REFRESH_SECRET);
console.log("ACCESS_TOKEN_EXPIRE =", process.env.ACCESS_TOKEN_EXPIRE);
console.log("REFRESH_TOKEN_EXPIRE =", process.env.REFRESH_TOKEN_EXPIRE);

// TOKEN REFRESH HELPERS 
const generateAccessToken = (user) => {
  console.log("Creating Access Token...");
  console.log("Secret:", process.env.JWT_SECRET);
  console.log("Expires:", process.env.ACCESS_TOKEN_EXPIRE);

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

const generateRefreshToken = (user) => {
  console.log("Creating Refresh Token...");
  console.log("Secret:", process.env.JWT_REFRESH_SECRET);
  console.log("Expires:", process.env.REFRESH_TOKEN_EXPIRE);

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users(name,email,password)
       VALUES($1,$2,$3)
       RETURNING id,name,email`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password from request:", password);
    console.log("Password match:", isMatch);



    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    console.log("ACCESS_TOKEN_EXPIRE =", process.env.ACCESS_TOKEN_EXPIRE);
    console.log("REFRESH_TOKEN_EXPIRE =", process.env.REFRESH_TOKEN_EXPIRE);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    
    res.status(200).json({
  success: true,
  message: "Login successful",

  accessToken,
  refreshToken,

  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        // message: "Refresh token required",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Refresh Token",
    });
  }
};

const profile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  profile,
};