require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(helmet())
app.use(morgan("common"))
app.use(express.json())

// Mongoose to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database.")
});

// Routes
const authRoute = require("./routes/auth")
app.use("/api", authRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000.")
})