import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { database } from './config/database';
import { rabbitMQ } from './config/rabbitmq';
import { startConsumers } from './events/consumers';
import outpassRoutes from './routes/outpass.routes';
import { outpassService } from './services/outpass.service';

const app = express();

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/outpass', outpassRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'outpass-service',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Cron job to update expired outpasses (every 5 minutes)
setInterval(async () => {
  try {
    await outpassService.updateExpiredOutpasses();
    console.log('✅ Updated expired outpasses');
  } catch (error) {
    console.error('Error updating expired outpasses:', error);
  }
}, 5 * 60 * 1000);

// Initialize and start
async function bootstrap() {
  try {
    await database.connect();
    await rabbitMQ.connect();
    await startConsumers();

    app.listen(parseInt(env.PORT), () => {
      console.log(`🚀 Outpass service running on port ${env.PORT}`);
      console.log(`📍 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏳ Shutting down gracefully...');
  await database.disconnect();
  await rabbitMQ.close();
  console.log('✅ Shutdown complete');
  process.exit(0);
});
