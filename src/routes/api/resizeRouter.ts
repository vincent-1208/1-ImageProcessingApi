import express from 'express';
import resizeImages from '../../middlewares/resizeImage';
import { Express } from 'express-serve-static-core';

const router = express.Router();
const initWebRouter = (app: Express) => {
  router.get('/api/resizeImage', resizeImages);

  return app.use('/', router);
};

export default initWebRouter;
