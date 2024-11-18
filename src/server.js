import express from 'express';
import cors from 'cors';
import pino from "pino";
import { pinoHttp } from "pino-http";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import contactsRouter from './routes/contacts.js';

const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
});

export function setupServer() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(helmet());

    app.use(cors());
    app.use(pinoHttp({ logger }));

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: { message: "Too many requests from this IP, please try again later." }
    });
    app.use(limiter);

    app.use('/contacts', contactsRouter);

    app.use((req, res, next) => {
      res.status(404).json({ message: 'Not found!' });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    return app;
}
