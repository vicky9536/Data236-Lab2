require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const restaurantAuthRoutes = require('./routes/restaurantAuthRoutes');
const dishRoutes = require('./routes/dishRoutes');
const resDbRoutes = require('./routes/resDbRoutes');
const resProfileRoutes = require('./routes/resProfileRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', restaurantAuthRoutes);
app.use('/api/dish', dishRoutes);
app.use('/api/dashboard', resDbRoutes);
app.use('/api/profile', resProfileRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Restaurant service connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Restaurant service running on port ${PORT}`);
});
