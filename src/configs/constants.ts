export const CONFIG = {
    PORT: 3000,
    API_PREFIX: '/api',
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_key",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret",
};