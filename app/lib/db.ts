import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionStatus = mongoose.connection.readyState;

  if (connectionStatus === 1) {
    console.log("Database is already connected");
    return;
  }
  if (connectionStatus === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "everythinggreen",
      bufferCommands: true,
    });
    console.log("Connected")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error: ", error);
    throw new Error("Error: ", error);
  }
};

export default connect;
