"use strict";
// //server/attendence-service/src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
// import cors from 'cors';
// import { env } from './config/env';
// import { database } from './config/database';
// import { rabbitMQ } from './config/rabbitmq';
// import { redisConnection } from './config/redis';
// import { startConsumers } from './events/consumers';
// import { qrRoutes } from './routes/qr.routes';
// import { attendanceRoutes } from './routes/attendance.routes';
// const app = express();
// // Middlewares
// app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Request logging
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
//   next();
// });
// // Routes
// app.use('/api/qr', qrRoutes);
// app.use('/api/attendance', attendanceRoutes);
// // Health check
// app.get('/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     service: 'attendance-service',
//     timestamp: new Date().toISOString(),
//   });
// });
// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });
// // Error handler
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error('Server error:', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//   });
// });
// // Initialize and start
// async function bootstrap() {
//   try {
//     await database.connect();
//     await redisConnection.connect();
//     await rabbitMQ.connect();
//     await startConsumers();
//     app.listen(parseInt(env.PORT), () => {
//       console.log(` Attendance service running on port ${env.PORT}`);
//       console.log(` Environment: ${env.NODE_ENV}`);
//     });
//   } catch (error) {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   }
// }
// bootstrap();
// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('\n Shutting down gracefully...');
//   await database.disconnect();
//   await redisConnection.disconnect();
//   await rabbitMQ.close();
//   console.log(' Shutdown complete');
//   process.exit(0);
// });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(process.env.PORT || 3001, () => {
    console.log(` Attendance service running on port ${process.env.PORT || 3001}`);
});
//# sourceMappingURL=server.js.map