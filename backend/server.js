

const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

// Database
const connectDB = require("./db/connect");
// Routes
const productRouter = require("./routes/products");
// Middleware
const notFound = require("./middleware/not-found");
const cors = require("cors");

const PORT = process.env.PORT || 5000;


// inbuilt middleware
app.use(express.static("./public"));
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));

// Routes
app.use('/api/v1/products',productRouter)

// Not found 
app.use(notFound);

const startServer = async () => {
    try {
        await connectDB({url: process.env.MONGO_URL});
        app.listen(PORT, () => {
            console.log(`Server is active and listening on port ${PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect to database", error);
    }
}
startServer();
