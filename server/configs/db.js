// import mongoose from "mongoose";

// const connectDB = async ()=>{
//     try {
//         mongoose.connection.on('connected', ()=> console.log("Database Connected"));
//         await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // ⏳ wait 10s max before timeout
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop the server on DB failure
  }

  // Optional listeners for debugging
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
};

export default connectDB;
