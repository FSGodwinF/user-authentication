const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
// importing routes

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts')



//connecting to Database
mongoose.connect(
    process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true }, 
    ()=> console.log('Database is connected')
);


//Middlewares
app.use(express.json());
app.use(cors());




//Route middleware

app.use('/api/user', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, ()=> console.log("Server is up and running"));

