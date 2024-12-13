import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export async function connect() {
    try {
        const dbURI = process.env.MONGO_URI;  // MongoDB URI from the .env file
        if (!dbURI) {
            throw new Error('MongoDB URI is not defined');
        }
        await mongoose.connect(dbURI);
        console.log("DB Connected >>>");
    } catch (err) {
        console.log("Error connecting to DB:", err);
    }
}
