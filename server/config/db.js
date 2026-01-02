const mysql = require("mysql2");

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // db
  user: process.env.DB_USER,           // weboconnect_user
  password: process.env.DB_PASSWORD,   // ✅ FIXED (was DB_PASS)
  database: process.env.DB_NAME,       // weboconnect
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Retry helper
const connectWithRetry = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("❌ MySQL not ready, retrying in 5s...", err.message);
      setTimeout(connectWithRetry, 5000);
      return;
    }

    console.log("✅ Connected to MySQL");
    connection.release();

    createTables();
  });
};

// Table creation
const createTables = () => {
  const queries = [
    `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profile_image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS follows (
      id INT AUTO_INCREMENT PRIMARY KEY,
      follower_id INT NOT NULL,
      following_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `
  ];

  queries.forEach(query => {
    pool.query(query, err => {
      if (err) {
        console.error("❌ Table creation error:", err.message);
      }
    });
  });

  console.log("✅ Database schema ensured");
};

// Start connection retry loop
connectWithRetry();

module.exports = pool;
