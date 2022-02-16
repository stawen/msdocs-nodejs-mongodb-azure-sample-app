require("dotenv").config();
const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
    console.log("There does not seem to be a value for the database connection string in MONGODB_URI");
    throw new Error("No value in MONGODB_URI for the connection string");
}

// To override the database name, set the DATABASE_NAME environment variable in the .env file
const DATABASE_NAME = process.env.DATABASE_NAME || "azure-todo-app";

mongoose.connect(process.env.MONGODB_URI, {
    dbName: DATABASE_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .on("open", () => {
        console.log("Mongoose connection open to database: OK");
    })
    .on("error", (err) => {
        console.log(`Connection error: ${err.message}`);
    });

require("./models/task");