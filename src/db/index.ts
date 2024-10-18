import mongoose from 'mongoose';
import env from '@/env';

export default () => {
  
  const connect = () => {
    mongoose
      .connect(
        env.DB_URL,
      )
      .then(() => {
        return console.info(`Successfully connected to MongoDB...`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};