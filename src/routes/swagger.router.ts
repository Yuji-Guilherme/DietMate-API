import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '@/swagger.json';

const swaggerRouter = Router();

swaggerRouter.use('', swaggerUi.serve);
swaggerRouter.get('', swaggerUi.setup(swaggerDoc));

export { swaggerRouter };
