const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');

const app = express();

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

var corsOptions = {
    origin: '*',
};
  
app.use(cors(corsOptions));

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const category = require('./routes/categoryRoute');
const coupon = require('./routes/couponRoute');
const faq = require('./routes/faqRoute');
const blog = require('./routes/blogRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', category);
app.use('/api/v1', coupon);
app.use('/api/v1', faq);
app.use('/api/v1', blog);

// error middleware
app.use(errorMiddleware);

module.exports = app;