import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './database';
import './shared/container';

import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();
app.use(express.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// routes
app.use(router);

app.listen(3000, () => console.log('Server is running on port 3000'));
