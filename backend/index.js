require('dotenv').config();
const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { sequelize } = require('./models');
const mongoose = require('mongoose');

const customerAuthRoutes = require('./routes/customerAuthRoutes');
const restaurantAuthRoutes = require('./routes/restaurantAuthRoutes');
const dishRoutes = require('./routes/dishRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const orderRoutes = require('./routes/orderRoutes');
const resDbRoutes = require('./routes/resDbRoutes');
const resProfileRoutes = require('./routes/resProfileRoutes');
const cusProfileRoutes = require('./routes/cusProfileRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

// Session
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'session_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//     secure: false,
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000
//     }
// }));

// Routes
app.use('/authC', customerAuthRoutes);
app.use('/authR', restaurantAuthRoutes);
app.use('/dishes', dishRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/orders', orderRoutes);
app.use('/resDb', resDbRoutes);
app.use('/resProfile', resProfileRoutes);
app.use('/cusProfile', cusProfileRoutes);
app.use('/cart', cartRoutes);

// Database connection and sync
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connected...');
//     return sequelize.sync();
//   })
//   .then(() => {
//     console.log('Models synchronized...');
//   })
//   .catch((err) => {
//     console.error('Error connecting to database:', err);
//   });

// Mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8383;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
