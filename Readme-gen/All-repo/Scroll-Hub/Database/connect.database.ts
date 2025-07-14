import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI as string;
if (!MONGO_URI) {
  throw new Error('MongoDB URI must be defined');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    connection: null,
    promise: null,
  };
}

const ConnectToDatabase = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const option = {
      maxPoolSize: 5,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGO_URI!, option)
      .then((mongoose): mongoose.Connection => {
        return mongoose.connection;
      });

    try {
      cached.connection = await cached.promise;
      console.log('Connected to the database');
      return cached.connection;
    } catch (error) {
      console.error('Error connecting to the database: ', error);
      cached.promise = null;
    }
  }
};

export { ConnectToDatabase };

// Alternate Easier But Less Optimsied Approach //

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

// const dbConnect = async (): Promise<void> =>  {
//   if (connection.isConnected) {
//     console.log('Already connected to the database');
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI as string);
//     connection.isConnected = db.connections[0].readyState;
//     console.log('Database connected successfully');
//   }catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   }
// }

// export default dbConnect;
