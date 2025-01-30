//filename: server/index.js
const express = require ('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path');

const app = express()


// CORS options //CORS_ORIGIN is a comma-separated list of allowed origins 
const corsOptions = {
    origin: process.env.CORS_ORIGIN || [
        'http://107.22.252.151:3001',
        'http://localhost', // Default fallback for local development
        'http://localhost:3001',
        // 'http://frontend:3001',
       // AWS Load Balancer URL for production frontend
    ],
    credentials: true, // Allow cookies to be sent
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
// Add health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  

//--------------
//when frontend build (dist) is created to serve static frontend files for production
// Serve static files from the React app build directory
//only works on localmachine when both backend and frontend running on the same instance

// app.use(express.static(path.join(__dirname, '../client/dist')));
// //app.use(express.static(path.join(__dirname, 'client/dist')));

// // Handles any requests that don't match the ones above
// app.get('*', (req, res) =>{
//      res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
//      //res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));

// });

// Determine the MongoDB URI based on the environment
//const mongoUri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;
// Connect to MongoDB inside docker
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/myDatabase';

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const port = process.env.PORT || 5001;
app.listen(port, '0.0.0.0', () => console.log(`Server is running on port ${port}`));
//app.listen(port,()=>console.log(`Server is running on port ${port}`))