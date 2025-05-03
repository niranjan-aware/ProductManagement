import express from 'express';
const app = express();   
import productRoutes from './router/product.router.js'
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from 'cors';
 
app.use(cors())


dotenv.config(); // Load environment variables from .env file

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.use('/api/products',productRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})