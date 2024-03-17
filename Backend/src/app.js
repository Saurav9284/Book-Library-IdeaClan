const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "API is Live Now",
      instructions: "You can access the GraphQL endpoint at /graphql"
    }
    );
  } catch (error) {
    console.log(error);
  }
});
 
module.exports = { app };