import assert from 'node:assert/strict';
import { test } from 'node:test';

import { calculateBmi } from './controllers/bmiController.js';

test('calculates BMI rounded to two decimal places', () => {
  assert.equal(calculateBmi(70, 175), 22.86);
});

test('supports decimal weight and height values', () => {
  assert.equal(calculateBmi(82.5, 181.5), 25.04);
});
