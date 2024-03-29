import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import http from 'http';

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import collectionRoutes from "./routes/collections.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";



const app = express(); // create backend application
dotenv.config(); // configs env variables

// To handle cors error
app.use(cors({
    origin: [process.env.ORIGIN_ACCESS, 'http://localhost:3000'],
    credentials: true
}))

// middlewares
app.use(cookieParser()); // allows access to cookies
app.use(express.json()); // allo// parse requests of content-type - application/x-www-form-urlencodedws to recieve data in JSON format
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));


// run api test
app.get('/status', (_, res) => res.send('API is running'))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//middleware for error handling
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

const port = process.env.PORT || 8800;

// const server = http.createServer(app)

// connects to Mango DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to DB');
    // Server listener
    app.listen(port,()=>{
        console.log('Connected to Server');
    })
    
}).catch((err)=>{
    throw err;
})


