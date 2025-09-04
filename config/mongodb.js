import mongoose from "mongoose";

const connectDB=async()=>{

    mongoose.connection.on('connected',()=> console.log("Database Connected"))
    await mongoose.connect('mongodb+srv://gaurigupta1804_db_user:tbm2XbUnTOyUCE4L@hms-gg.s8wxbfx.mongodb.net/?retryWrites=true&w=majority&appName=HMS-GG')
}
//mongodb+srv://durgeshchaudhary0111:durgesh0111cse@chat-bot.7kaaa.mongodb.net/?retryWrites=true&w=majority&appName=Chat-bot
export default connectDB