require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

console.log(MONGO_URI);
const connectDatabase = () => { mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,

}).then(() => {
    console.log("connection successful!...");
}).catch((err) => {
    console.log(`connection failed!.... ${err}`);
});
}

module.exports = connectDatabase;