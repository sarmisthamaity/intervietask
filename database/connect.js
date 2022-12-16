require('dotenv').config();
const mongoose = require('mongoose');
// const mongodbUrl = process.env.URL;
const Url = "mongodb+srv://sarmistha:root@cluster0.yycnbcy.mongodb.net/signlog?retryWrites=true&w=majority"

mongoose.connect(Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`database connected securely`);
}).catch((err) => {
    console.log(err);
});