import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';
import { router } from './routes';

const app = express();
app.use(express.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// routes
app.use(router);

app.listen(3000, () => console.log('Server is running on port 3000'));
