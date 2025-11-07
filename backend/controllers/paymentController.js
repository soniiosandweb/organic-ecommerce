const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const paytm = require('paytmchecksum');
const https = require('https');
const Payment = require('../models/paymentModel');
const ErrorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const axios = require("axios");
const Stripe = require("stripe");

const stripePay = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Phone Pay Ids
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const PHONE_PE_HOST_URL = process.env.PHONEPE_API_URL;
const APP_BE_URL  = process.env.REDIRECT_URL_SUCCESS;


exports.processPayment = asyncErrorHandler(async (req, res, next) => {
    

    try {
        const myPayment = await stripe.paymentIntents.create({
            amount: Math.round(req.body.amount * 100),
            description: "Organic Products",
            currency: "inr",
            metadata: {
                company: "Fresh Organic Grocery",
            },
        });

        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret, 
        });
        
    } catch (err) {
        return next(new ErrorHandler(err, 400));
    }

});

exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: 'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'});
});

// payment add
exports.addPayment = asyncErrorHandler(async (req, res, next) => {

    const payment = await Payment.create({
        id: req.body.id,
        client_secret: req.body.client_secret,
        status: req.body.status,
        amount: req.body.amount,
        livemode: req.body.livemode,
    });

    res.status(201).json({
        success: true,
        payment,
    });
});

// Process Payment
// exports.processPayment = asyncErrorHandler(async (req, res, next) => {

//     const { amount, email, phoneNo } = req.body;

//     var params = {};

//     /* initialize an array */
//     params["MID"] = process.env.PAYTM_MID;
//     params["WEBSITE"] = process.env.PAYTM_WEBSITE;
//     params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
//     params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE;
//     params["ORDER_ID"] = "oid" + uuidv4();
//     params["CUST_ID"] = process.env.PAYTM_CUST_ID;
//     params["TXN_AMOUNT"] = JSON.stringify(amount);
//     // params["CALLBACK_URL"] = `${req.protocol}://${req.get("host")}/api/v1/callback`;
//     params["CALLBACK_URL"] = `https://${req.get("host")}/api/v1/callback`;
//     params["EMAIL"] = email;
//     params["MOBILE_NO"] = phoneNo;

//     let paytmChecksum = paytm.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
//     paytmChecksum.then(function (checksum) {

//         let paytmParams = {
//             ...params,
//             "CHECKSUMHASH": checksum,
//         };

//         res.status(200).json({
//             paytmParams
//         });

//     }).catch(function (error) {
//         console.log(error);
//     });
// });

// Paytm Callback
exports.paytmResponse = (req, res, next) => {

    // console.log(req.body);

    let paytmChecksum = req.body.CHECKSUMHASH;
    delete req.body.CHECKSUMHASH;

    let isVerifySignature = paytm.verifySignature(req.body, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
    if (isVerifySignature) {
        // console.log("Checksum Matched");

        var paytmParams = {};

        paytmParams.body = {
            "mid": req.body.MID,
            "orderId": req.body.ORDERID,
        };

        paytm.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MERCHANT_KEY).then(function (checksum) {

            paytmParams.head = {
                "signature": checksum
            };

            /* prepare JSON string for request */
            var post_data = JSON.stringify(paytmParams);

            var options = {
                /* for Staging */
                hostname: 'securegw-stage.paytm.in',
                /* for Production */
                // hostname: 'securegw.paytm.in',
                port: 443,
                path: '/v3/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            // Set up the request
            var response = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });

                post_res.on('end', function () {
                    let { body } = JSON.parse(response);
                    // let status = body.resultInfo.resultStatus;
                    // res.json(body);
                    addPayment(body);
                    // res.redirect(`${req.protocol}://${req.get("host")}/order/${body.orderId}`)
                    res.redirect(`https://${req.get("host")}/order/${body.orderId}`)
                });
            });

            // post the data
            post_req.write(post_data);
            post_req.end();
        });

    } else {
        console.log("Checksum Mismatched");
    }
}

const addPayment = async (data) => {
    try {
        await Payment.create(data);
    } catch (error) {
        console.log("Payment Failed!");
    }
}

exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {

    const payment = await Payment.findOne({ id: req.params.id });

    if (!payment) {
        return next(new ErrorHandler("Payment Details Not Found", 404));
    }

    const txn = {
        id: payment.id,
        status: payment.status,
    }

    res.status(200).json({
        success: true,
        txn,
    });
});

// Google Pay Process Data
exports.googlePayProcess = asyncErrorHandler(async (req, res, next) => {
  try {
    const { token, amount } = req.body;

    if (!token || !amount) {
      return res.status(400).json({ success: false, error: "Missing token or amount" });
    }

    const parsedToken = JSON.parse(token);

    const charge = await stripePay.charges.create({
      amount: Math.round(amount * 100),
      currency: "inr",
      source: parsedToken.id,
      description: "Google Pay Payment",
    });

    res.status(200).json({
        success: true,
        transactionId: charge.id,
        paymentStatus: charge.status,
        paymentMethod: charge.payment_method_details?.type || "gpay",
        livemode: charge.livemode,
    });

  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Razor Pay Create Order
exports.razorPayCreateOrder = asyncErrorHandler(async (req, res, next) => {
  try {
    const { amount } = req.body;
    const order = await instance.orders.create({ 
        amount: Math.round(parseFloat(amount) * 100),
        currency: 'INR', 
        receipt: 'rcpt_' + Date.now() 
    });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Initiate Phone Pay Payment
exports.initiatePayment = asyncErrorHandler(async (req, res, next) => {

    const {amount} = req.body;

    // User ID is the ID of the user present in our application DB
    let userId = "MUID123";

    // Generate a unique merchant transaction ID for each transaction
    let merchantTransactionId = uuidv4();

    // redirect url => phonePe will redirect the user to this url once payment is completed. It will be a GET request, since redirectMode is "REDIRECT"
    let normalPayLoad = {
        merchantId: MERCHANT_ID, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amount * 100, // converting to paise
        redirectUrl: `${APP_BE_URL}/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9999999999",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    // make base64 encoded payload
    let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    let sha256_val = crypto.createHash("sha256").update(string).digest("hex");
    let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

    axios
        .post(
            `${PHONE_PE_HOST_URL}/pg/v1/pay`,
            {
                request: base64EncodedPayload,
            },
            {
                headers: {
                "Content-Type": "application/json",
                "X-VERIFY": xVerifyChecksum,
                accept: "application/json",
                },
            }
        )
    .then(function (response) {
      console.log("response->", JSON.stringify(response.data));
        res.json({
            success: true,
            redirectUrl: response.data.data.instrumentResponse.redirectInfo.url
        });
      //res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
    })
    .catch(function (error) {
      res.send(error);
    });
});

// Check Payment Status
exports.checkPaymentStatus = asyncErrorHandler(async (req, res, next) => {
    const { merchantTransactionId } = req.params;

    if (merchantTransactionId) {
        let statusUrl =
        `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
        merchantTransactionId;

        // generate X-VERIFY
        let string =
        `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
        let sha256_val = crypto.createHash("sha256").update(string).digest("hex");
        let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

        axios
        .get(statusUrl, {
            headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum,
            "X-MERCHANT-ID": merchantTransactionId,
            accept: "application/json",
            },
        })
        .then(async function (response) {
            console.log("response->", response.data);
            if (response.data && response.data.code === "PAYMENT_SUCCESS") {
                res.send(response.data);
            } else {
                res.status(500).json({ success: false, error: response.data.message });
            }
        })
        .catch(function (error) {
            res.send(error);
        });
    } else {
        res.send("Sorry!! Error");
    }
});