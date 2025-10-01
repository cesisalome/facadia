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

// Endpoint GET /meteo?lat=48.85&lng=2.35
app.get("/meteo", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "lat and lng are required" });
    }

    // Appel de l’API Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,cloud_cover&daily=uv_index_max`;

    const response = await fetch(url);
    const data = await response.json();

    // Renvoi brut du JSON à ton frontend / Postman
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des données météo" });
  }
});

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

export default app;
