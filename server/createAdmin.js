// File: createAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserAuthModel = require('./model/UserAuth'); // Adjust the path as needed

dotenv.config(); // Load environment variables from .env file

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        //("mongodb://127.0.0.1:27017/Workshop_database");
        const mongoUri = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

        await mongoose.connect(mongoUri)
        // Check if an admin user already exists
        const existingAdmin = await UserAuthModel.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create a new admin user
        const adminUser = new UserAuthModel({
            name: 'Admin',
            username: 'admin',
            password: '000000', // Ensure you change this to a secure password
            role: 'admin',
        });

        // Save the admin user to the database
        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        // Close the connection
        mongoose.disconnect();
    }
};

createAdminUser();
