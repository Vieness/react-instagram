import dotenv from 'dotenv';

const enviroment = dotenv.config();

if (!enviroment) {
  throw new Error('Config file was not found');
}

export default {
  PORT: enviroment.parsed.PORT || 3005,
  HOST: enviroment.parsed.HOST || '0.0.0.0',
  SERVICE_PREFIX: enviroment.parsed.SERVICE_PREFIX || '/api',
  VERSION: enviroment.parsed.VERSION || 1,
  MONGODB_URI: enviroment.parsed.MONGODB_URI || null,
  JWT_SECRET: enviroment.parsed.JWT_SECRET || '',
  CLOUD_NAME: enviroment.parsed.CLOUD_NAME || '',
  CLOUD_API_KEY: enviroment.parsed.CLOUD_API_KEY || '',
  CLOUD_API_SECRET: enviroment.parsed.CLOUD_API_SECRET || '',
}
