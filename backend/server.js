import express from 'express';
import cors from 'cors';
import { addSensor } from './sensors.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sensors', (req, res) => {
  try {
    const sensor = addSensor(req.body);
    res.status(201).json(sensor);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

export default app;
