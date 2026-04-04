import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import connectDB from './src/config/database.js';

dotenv.config();

const updateAdmin = async () => {
    try {
        await connectDB();

        const oldEmail = 'admin@yobazar.com';
        const newEmail = 'admin@tanvo.com';

        const user = await User.findOne({ email: oldEmail });
        if (user) {
            user.email = newEmail;
            await user.save();
            console.log(`Admin email updated from ${oldEmail} to ${newEmail}`);
        } else {
            const existingNew = await User.findOne({ email: newEmail });
            if (existingNew) {
                console.log(`Admin with email ${newEmail} already exists.`);
            } else {
                console.log(`Admin with email ${oldEmail} not found. Please check your database.`);
            }
        }
        process.exit(0);
    } catch (error) {
        console.error(`Error updating admin: ${error.message}`);
        process.exit(1);
    }
};

updateAdmin();
