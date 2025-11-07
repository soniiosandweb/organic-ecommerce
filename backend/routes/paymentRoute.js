const express = require('express');
const { processPayment, paytmResponse, getPaymentStatus, sendStripeApiKey, addPayment, googlePayProcess, razorPayCreateOrder, initiatePayment, checkPaymentStatus } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/process').post(processPayment);
router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey);

// Google Pay Process
router.route('/payment/process-googlepay').post(googlePayProcess);

// Razor Pay Create Order
router.route('/payment/razor-create-order').post(razorPayCreateOrder);

// Phone Pay Initiate
router.post('/payment/phonepay-initiate', initiatePayment);

// Check Phone Pay Payment Status
router.get('/payment/phonepay-status/:merchantTransactionId', checkPaymentStatus);


router.route('/callback').post(paytmResponse);

router.route('/payment/status/:id').get(isAuthenticatedUser, getPaymentStatus);
router.route('/payment/add/').post(addPayment);

module.exports = router;