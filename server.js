const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const MyData = require("./model"); // Fixed the path to require the model correctly

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const mongoUrlDockerCompose = "mongodb://admin:password@mongodb";
// const mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;
// const mongoUrlDockerCompose = "mongodb://admin:password@localhost:27017";


// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoUrlDockerCompose)
  .then(() => {
    app.listen(3000, () => {
      console.log("App connected to database and listening on port 3000!");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

app.get("/fetch-data", async (req, res) => {
  try {
    console.log("Fetching data...");
    // Find documents where firstName is "Wilfred"
    const result = await MyData.find().exec();
    console.log("Query result:", result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// Route to insert data
app.post("/insert-data", async (req, res) => {
  try {
    // Create a new instance of the MyData model with data from request body
    const newData = new MyData(req.body);
    // Save the new document to the database
    await newData.save();
    console.log("Data inserted successfully:", newData);
    // Send a success response back to the client
    res.send("Data inserted successfully");
  } catch (err) {
    console.error(err);
    // Send an error response back to the client
    res.status(500).send("Error inserting data");
  }
});
