import express from 'express';
import path from 'path';
import initWebRouter from './routes/api/resizeRouter';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'assets', 'resizeImage')));
app.use(express.static(path.join(__dirname, '..', 'assets', 'rawImage')));

console.log(path.join(__dirname, '..', 'assets', 'resizeImage'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', '../views');

app.get('/api', (req: express.Request, res: express.Response): void => {
  res.status(200);
  res.send('Welcome Image Processing API');
});

initWebRouter(app);

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Welcome Image Processing');
});

app.listen(port, () => {
  console.log(`Server started localhost: ${port}`);
});

export default app;
