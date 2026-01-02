const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// 🔴 Load env FIRST
dotenv.config();

// 🔴 Initialize DB AFTER env is loaded
require("./config/db");

const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");

const app = express();

// ✅ CORS config for browser + Docker
app.use(
  cors({
    origin: [
      "http://localhost:3000", // browser access
      "http://client:3000",    // docker internal
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
