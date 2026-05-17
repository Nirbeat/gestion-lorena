import mongoose from 'mongoose';
import { config } from 'dotenv';

config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión MongoDB: ${error.message}`);
  }
};

export default connectDB;
