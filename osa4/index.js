const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

const mongoUrl =
  "mongodb://otter:hurraamongo@ds119028.mlab.com:19028/blogilista";
mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.logger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.error);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
