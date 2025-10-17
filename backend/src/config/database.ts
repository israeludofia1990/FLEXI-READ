import { DataSource } from 'typeorm';
import mongoose from 'mongoose';
import Redis from 'ioredis';

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD || 'guessme',
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/models/postgres/*.ts'],
});

export const connectMongoDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookplatform';
  await mongoose.connect(mongoUri);
};

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});
