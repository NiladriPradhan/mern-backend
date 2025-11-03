import mongoose from "mongoose"

export const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Database connected successfully!");
    }).catch((error)=>{
    console.log("Failed to connect DB!");
    })
}