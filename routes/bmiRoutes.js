import express from 'express';
import {
  calculateBmiHandler,
  deleteBmiHandler,
  getBmiPage,
  updateBmiHandler,
} from '../controllers/bmiController.js';

const bmiRouter = express.Router();

bmiRouter.get('/', getBmiPage);
bmiRouter.post('/bmi', calculateBmiHandler);
bmiRouter.put('/bmi', updateBmiHandler);
bmiRouter.delete('/bmi', deleteBmiHandler);

export { bmiRouter };
