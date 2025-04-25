require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Route
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Order service connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
