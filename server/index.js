//filename: server/index.js
const express = require ('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cors(
    {
        origin: 'http://localhost:5173',
        method: ["POST","GET"],
        credentials: true
    }
))

// ---Middlewares------------
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
const partRoutes = require('./routes/partRoutes');


mongoose.connect("mongodb://127.0.0.1:27017/Workshop_database")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//routes paths
app.use('/',require('./routes/authRoutes'))
app.use('/',require('./routes/ticketRoutes'))
app.use('/',require('./routes/employeeRoutes'))
app.use('/',require('./routes/availabilityRoutes'))
app.use(partRoutes);



const port = 8000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))