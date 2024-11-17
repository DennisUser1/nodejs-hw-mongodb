import mongoose from 'mongoose';

const mongodbUser = process.env.MONGODB_USER || "defaultUser";
const mongodbPassword = process.env.MONGODB_PASSWORD || "defaultPassword";
const mongodbUrl = process.env.MONGODB_URL || "default.mongodb.net";
const database = process.env.MONGODB_DB || "defaultDB";

const mongoURI = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbUrl}/${database}?retryWrites=true&w=majority`;

export async function initMongoConnection() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Mongo connection successfully established!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

