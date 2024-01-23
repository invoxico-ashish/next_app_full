import mongoose, { ConnectOptions } from "mongoose";
interface MongooseConnectConfig extends ConnectOptions {
    useNewUrlParser?: boolean; // This should be a boolean, not an object
    useUnifiedTopology?: boolean; // This should be a boolean, not an object
}
export async function connect() {
    try {
        const config: MongooseConnectConfig = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(process.env.MONGO_URL!, config);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("mongodb connected successfull")
        });
        connection.on("error", (err) => {
            console.log(err);
            process.exit();
        });
    } catch (error) {
        console.log(error);
        process.exit();
    }
};