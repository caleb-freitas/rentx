import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

createConnection();
const app = express();
app.use(express.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// routes
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error: ${err.message}`
    });
  }
);

app.listen(3000, () => console.log('Server is running on port 3000'));