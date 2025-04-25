require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const customerAuthRoutes = require('./routes/customerAuthRoutes');
const cusProfileRoutes = require('./routes/cusProfileRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', customerAuthRoutes);
app.use('/api/profile', cusProfileRoutes);
app.use('/api/favorites', favoriteRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("User service connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
