import mongoose from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: any;
    }
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

declare global {
  var mongoose: any;
}

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    const databaseUrl = process.env.DATABASE_URL || ''; // Ensure databaseUrl is defined

    cached.promise = mongoose.connect(databaseUrl, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;