//filename: server/index.js
const express = require ('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path');

const app = express()

// // CORS options
// const corsOptions = {
//     origin: ['http://35.232.95.129','http://35.232.95.129:5000','http://localhost', 'http://localhost:3000','http://localhost:5000',],  // Allowed origins
//     credentials: true,  // Allow cookies to be sent
//     optionsSuccessStatus: 200, 
// };

// app.use(cors(corsOptions));

// CORS options
const corsOptions = {
    //origin: ['http://localhost'],
    origin: process.env.CORS_ORIGIN || 'http://localhost',  // Use environment variable or default to 'http://localhost:5000'
    credentials: true,  // Allow cookies to be sent
    optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

// ---Middlewares------------
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
const partRoutes = require('./routes/partRoutes');

//routes paths
app.use('/',require('./routes/authRoutes'))
app.use('/',require('./routes/ticketRoutes'))
app.use('/',require('./routes/employeeRoutes'))
app.use('/',require('./routes/availabilityRoutes'))
app.use(partRoutes);


//--------------
//when frontend build (dist) is created to serve static frontend files for production
// Serve static files from the React app build directory
//only works on localmachine when both backend and frontend running on the same instance

app.use(express.static(path.join(__dirname, '../client/dist')));
// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
     res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

//mongoose.connect("mongodb://127.0.0.1:27017/Workshop_database")
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))