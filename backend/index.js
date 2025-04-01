const express = require("express");
const mongoose = require("mongoose");
const donorRoutes = require("./routes/donorRoutes");



const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use("/api/donors", donorRoutes);
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});


// Database connection
mongoose.connect("mongodb://localhost:27017/blood_donation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Database connection error:", err);
});

app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route);
    } else if (middleware.name === "router") {
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(handler.route);
            }
        });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
