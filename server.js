const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
//const authController = require('.')

require('dotenv').config();


//connect mongodb
connectDB();

const app = express();    //express app

app.use(express.json()); //parse json

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);
app.use(cookieParser());
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }


app.get("/", (req,res) => {
  res.send(" Ecommerce API is running");
});



const PORT = process.env.PORT || 5000;  //start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

})









