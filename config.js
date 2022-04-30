const dotenv = require('dotenv').config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	DB_HOST: process.env.DB_HOST || '',
	DB_USER: process.env.DB_USER || '',
	DB_DATABASE: process.env.DB_DATABASE || '',
	DB_PASSWORD: process.env.DB_PASSWORD || ''
}
