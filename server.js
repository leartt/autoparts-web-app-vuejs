const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');


require('dotenv').config();


//Initializimi
const app = express();
//Middlewares
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(passport.initialize());
require('./config/passport')(passport);

//Lidhja me databaze
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database has been connected");
});

app.get('/', (req,res) => {
    res.send('Hello Node');
})


const users = require('./routes/api/users');
app.use('/user', users); 

const products = require('./routes/api/products');
app.use('/product', products); 

const contacts = require('./routes/api/contact');
app.use('/contact', contacts); 


const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));