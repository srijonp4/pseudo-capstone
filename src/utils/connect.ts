import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';
dotenv.config();
const mongodb_URI = process.env.DB_URI ?? '';
function connect() {
  mongoose.Promise = Promise;
  mongoose.connect(mongodb_URI);
  mongoose.connection.on('connected', () => {
    logger.info(`connected to the mongodb Atlas cluster`);
  });
  mongoose.connection.on('error', (error: Error) => {
    logger.error(error);
  });
}
export default connect;
