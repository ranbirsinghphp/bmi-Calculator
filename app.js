import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import  { bmiRouter } from './routes/bmiRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(currentDirectory, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(currentDirectory, 'public')));
app.use('/', bmiRouter);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`BMI API listening on port ${PORT}`);
  });
}

export default app;
