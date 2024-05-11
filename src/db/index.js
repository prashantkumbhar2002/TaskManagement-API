const mongoose = require("mongoose");
const { DB_Name } = require("../constants.js");

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOURI}/${DB_Name}`)
        console.log(`\nMongodb connected!! \nDB host: ${connectionInstance.connection.host}`)
    }
    catch(err){
        console.log("Error while connecting to mongoDB: ",err);
        process.exit(1);
    }
}
module.exports = connectDB;