const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/auth-routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://yogeshppanchal96_db_user:A7iUitjBzKsbUsaa@cluster0.h1ac3om.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log("MongoDB connection error:", error));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
