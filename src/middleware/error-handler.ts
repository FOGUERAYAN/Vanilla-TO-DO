import { ErrorRequestHandler } from 'express';
import type { Logger } from 'pino';
import { z } from 'zod';
import { NotFoundError } from '../store.js';

declare module 'express-serve-static-core' {
  interface Request {
    log: Logger;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  req.log.error(err);

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      details: z.treeifyError(err)
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message
    });
  }

  res.status(500).json({
    error: 'Internal Server Error'
  });
};
