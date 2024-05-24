import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_CONNECTION: string = process.env.DB_URL as string;
const DB_NAME: string = process.env.DB_NAME as string;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  dbName: DB_NAME,
};

export const mongoConnect = async (): Promise<mongoose.Mongoose | null> => {
  try {
    const database: mongoose.Mongoose = await mongoose.connect(DB_CONNECTION, config);
    const name = database.connection.name;
    const host = database.connection.host;
    console.log(`Conectado a la base de datos ${name} en el host ${host}`);

    return database;
  } catch (error) {
    console.error(error);
    console.log("Error in connection. Attempting to reconnect in 5 seconds...");
    setTimeout(mongoConnect, 5000);

    return null;
  }
};