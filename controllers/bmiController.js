export function calculateBmi(weightKg, heightCm) {
  const heightMeters = heightCm / 100;
  return Number((weightKg / (heightMeters ** 2)).toFixed(2));
}

function validateBmiInput({ name, dob, weightKg, heightCm }) {
  if (typeof name !== 'string' || name.trim() === '') {
    return 'name is required';
  }

  const dateOfBirth = new Date(dob);
  if (typeof dob !== 'string' || Number.isNaN(dateOfBirth.getTime())) {
    return 'dob must be a valid date in YYYY-MM-DD format';
  }

  if (dateOfBirth > new Date()) {
    return 'dob cannot be in the future';
  }

  if (typeof weightKg !== 'number' || !Number.isFinite(weightKg) || weightKg <= 0) {
    return 'weightKg must be a positive number';
  }

  if (typeof heightCm !== 'number' || !Number.isFinite(heightCm) || heightCm <= 0) {
    return 'heightCm must be a positive number';
  }

  return null;
}

function sendBmiResult(req, res) {
  const validationError = validateBmiInput(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const { name, dob, weightKg, heightCm } = req.body;
  return res.json({
    name: name.trim(),
    dob,
    bmi: calculateBmi(weightKg, heightCm),
  });
}

export function getBmiPage(req, res) {
  return res.render('layouts/master', {
    title: 'BMI Calculator',
    contentTemplate: '../partials/bmiForm',
  });
}

export function calculateBmiHandler(req, res) {
  return sendBmiResult(req, res);
}

export function updateBmiHandler(req, res) {
  return sendBmiResult(req, res);
}

export function deleteBmiHandler(req, res) {
  return res.status(204).send();
}
