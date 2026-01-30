require('dotenv').config();

module.exports = {
  development: {
  
    username: process.env.DB_USER || "postgres",
    password: String(process.env.DB_PASSWORD || ""), 
    database: process.env.DB_NAME || "movie_app_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432
  },
  test: {
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD || ""),
    database: "movie_app_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};