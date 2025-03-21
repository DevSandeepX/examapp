import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionIntance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected successfully ", connectionIntance.connections[0].host)
    } catch (error) {
        console.log("Error Db !! ", error.message)
    }
}


export default connectDb