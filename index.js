const connectDatabase = require("./Config/MongoDB");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
connectDatabase();
const app = express();

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
