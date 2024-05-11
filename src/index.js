require('dotenv').config();
const app = require('./app.js');
const connectDB = require("./db/index.js");

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8001,() => {
        console.log(`⚙️ Server is up and running on the port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("DB Connection FAILED ",err);
})