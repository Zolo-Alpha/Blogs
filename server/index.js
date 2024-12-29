import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/router/routes.js";
import Blog from "./src/model/blog.js";
import cookieParser from 'cookie-parser';


// Initialize Express app
const app = express();

// Use cookie-parser middleware
app.use(cookieParser()); // This will add the cookies to req.cookies
const blog = new Blog();

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_HOST;

// CORS Config
// const corsOptions = {
//     origin: process.env.CORS_ORIGIN || 'http://localhost:5173' || 'http://127.0.0.1' , // Specify your allowed frontend origins as an environment variable
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1'];
        if (allowedOrigins.includes(origin) || !origin) {
            // Allow no origin (when the request is made by the server itself, for example)
            callback(null, true);
        } else {
            callback(new Error('CORS policy does not allow this origin.'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // This is important to allow credentials
    optionsSuccessStatus: 204, // For legacy browsers
};
app.use(session({ secret: 'YOUR_SESSION_SECRET', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies for this app

// Basic route
app.get('/', (req, res) => {
    console.log('Received request on /');
    res.send('Hello World!');
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1); // Exit process with failure
    }
};

// Start server and connect to database
const startServer = async () => {
    console.log('Starting server...');
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });

    console.log('Initializing routes...');
    routes(app);
};

startServer();
