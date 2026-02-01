const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dosRoutes = require('./routes/dosRoutes');
const  connectDB=require("./config/db")

dotenv.config();

const app = express();
app.use(express.json());

// CONNECT MONGO
connectDB()

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/dos', dosRoutes);

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
