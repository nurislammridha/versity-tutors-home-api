const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
const cors = require("cors");
const app = express();
//Connect Database//git
const db = require('./config/db')

// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
//Initial middleware
app.use(express.json({ extended: false }));
app.use(express.static("up"));
app.get("/", (req, res) => res.send("API Running1"));
//Define Routes
//cors policy
app.use(cors());
app.options("*", cors());
app.use("/v1/admin/login", require("./routes/admin"));
app.use("/v1/category", require("./routes/category"));
// app.use("/v1/product", require("./routes/product"));
app.use("/v1/sub-category", require("./routes/subCategory"));
app.use("/v1/helper", require("./routes/helper"));
app.use("/v1/division", require("./routes/division"));
app.use("/v1/district", require("./routes/district"));
app.use("/v1/sub-district", require("./routes/subDistrict"));
app.use("/v1/area", require("./routes/area"));
app.use("/v1/language", require("./routes/language"));
app.use("/v1/connection-package", require("./routes/connectionPackage"));
app.use("/v1/client", require("./routes/client"));
app.use("/v1/review", require("./routes/review"));
app.use("/v1/book", require("./routes/book"));
app.use("/v1/my-connection", require("./routes/myConnection"));
app.use("/v1/web-home", require("./routes/webHome"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
