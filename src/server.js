import express from 'express';
import cors from 'cors';
import pino from "pino";
import { pinoHttp } from "pino-http";
import contactsRouter from './routes/contacts.js';


const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
});

export function setupServer() {
    const app = express ();
    app.use(cors());
    app.use(pinoHttp({ logger }));
    app.use('/contacts', contactsRouter);
    
    app.use((req, res, next) => {
      res.status(404).json({ message: 'Not found' });
    });
  
    const PORT = process.env.PORT || 3000;
  
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  
    return app;
}