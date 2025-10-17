import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import DOTENV from 'dotenv';
import { postgresDataSource, connectMongoDB, redis } from './config/database';

DOTENV.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/test-connections', async (req, res) => {
  const status: Record<string, string> = {};

  try {
    if (!postgresDataSource.isInitialized) {
      await postgresDataSource.initialize();
    }
    status.postgres = 'connected';
  } catch (err) {
    status.postgres = 'failed';
  }

  try {
    await connectMongoDB();
    status.mongodb = 'connected';
  } catch (err) {
    status.mongodb = 'failed';
  }

  try {
    await redis.ping();
    status.redis = 'connected';
  } catch (err) {
    status.redis = 'failed';
  }

  res.json({
    status,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
