
require("dotenv").config();

// Database
const connectDB = require("./db/connect");
// Routes
const Product = require("./models/product");
// Middleware
const jsonProducts = require("./products.json");

const start = async () => {
    try {
        await connectDB({url: process.env.MONGO_URL});
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("Products populated successfully");
    } catch (error) {
        console.log("Failed to connect to database", error);
    }
}
start();
