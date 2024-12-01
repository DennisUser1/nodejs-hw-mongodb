import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export function setupServer() {
  const app = express();
  app.use(express.json({ type: ['application/json', 'application/vnd.api+json'] }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  app.use(cookieParser());
  app.use(cors());
  app.use(pinoHttp({ logger }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      message: 'Too many requests from this IP, please try again later.',
    },
  });
  app.use(limiter);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });

  return app;
}
