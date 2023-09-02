require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./routes/routes");
const mongoString = process.env.DATABASE_URL;

const PORT = process.env.PORT;

mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

const app = express();

// This origin value needs to be changed in case the React Application is running on a different port other than 3000
app.use(
  cors({
    origin: [`http://localhost:3000`],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
