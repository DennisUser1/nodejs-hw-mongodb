import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import contactsRouter from './routes/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR, PUBLIC_PATH } from './constants/index.js';

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

  app.use(express.static(PUBLIC_PATH));
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

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
