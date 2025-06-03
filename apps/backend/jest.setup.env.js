// This setup file ensures .env.test is loaded for all Jest runs, including IDE runs
require('dotenv').config({ path: require('path').resolve(__dirname, '.env.test') });

