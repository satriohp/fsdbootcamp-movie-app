require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

app.use(cors());
app.use(express.json()); 

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/auth', authRoutes); 

app.use('/api/movies', movieRoutes); 

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint tidak ditemukan di server!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});