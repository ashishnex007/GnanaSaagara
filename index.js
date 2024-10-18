const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/wiki/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${query}&formatversion=2&exsentences=10&exlimit=1&explaintext=1`);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Error fetching Wikipedia article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/related/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json`);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Error fetching Wikipedia article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
