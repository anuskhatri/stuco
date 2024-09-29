import mongoose from 'mongoose'

let isConnect = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true) //this is to prevent unknown field querires

    if (!process.env.MONGOOSE_URL) return console.error("MONGODB_URL not found")
    if (isConnect) return console.log("ALready Connected MongoDB")

    try {
        await mongoose.connect(`${process.env.MONGOOSE_URL}`)
        console.log("connectedd to mongoDB");
    } catch (error) {
        console.log(error);
        throw new Error(`NOT CONNECTED TO MONGODB ERROR ${error}`);
    }

}