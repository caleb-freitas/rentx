import express from 'express';
import { router } from './routes';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const app = express();
app.use(express.json());

// routes
app.use(router);

app.listen(3000, () => console.log('Server is running on port 3000'));
