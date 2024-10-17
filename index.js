import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
      const bosniaEarthquakes = response.data.features.filter(eq => {
        const [longitude, latitude] = eq.geometry.coordinates;
        return latitude >= 42 && latitude <= 45 && longitude >= 15 && longitude <= 19;
      });
      res.render('index', { earthquakes: bosniaEarthquakes });
    } catch (error) {
      console.error('Error fetching data from USGS API:', error);
      res.status(500).send('Error retrieving earthquake data');
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });