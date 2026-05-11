// src/app.ts
import express, { type RequestHandler } from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import todoRouter from './routes/todos.js';
import { store } from './store.js';
import { errorHandler } from './middleware/error-handler.js';

export const buildApp = ({ testMode }: { testMode: boolean }) => {
  const app = express();

  app.use(helmet() as RequestHandler);
  app.use(express.json({ limit: '100kb' }) as RequestHandler);

  app.use(pinoHttp({
    transport: process.env.NODE_ENV !== 'production' 
      ? { target: 'pino-pretty', options: { colorize: true } } 
      : undefined
  }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  if (testMode) {
    app.post('/__test__/reset', (_req, res) => {
      store.reset();
      res.status(204).send();
    });
  }

  app.use('/todos', todoRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
};
