const form = document.querySelector('#bmi-form');
const result = document.querySelector('#result');
const button = form.querySelector('button');
const dobInput = document.querySelector('#dob');

dobInput.max = new Date().toISOString().split('T')[0];

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  button.disabled = true;
  button.textContent = 'Calculating...';
  result.className = 'result';

  const formData = new FormData(form);
  const payload = {
    name: formData.get('name'),
    dob: formData.get('dob'),
    weightKg: Number(formData.get('weightKg')),
    heightCm: Number(formData.get('heightCm')),
  };

  try {
    const response = await fetch('/bmi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unable to calculate BMI');
    }

    result.textContent = `${data.name}, your BMI is `;
    const bmiValue = document.createElement('strong');
    bmiValue.textContent = data.bmi;
    result.appendChild(bmiValue);
    result.className = 'result visible';
  } catch (error) {
    result.textContent = error.message;
    result.className = 'result visible error';
  } finally {
    button.disabled = false;
    button.textContent = 'Calculate BMI';
  }
});
