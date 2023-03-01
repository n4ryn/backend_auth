const express = require("express");
const auth = require("./routes/authRoutes");
const PORT = 1338;

const app = express();

// Middlewares
// To accept JSON
app.use(express.json());

// To accept Body
app.use(express.urlencoded({ extended: true }));

// To Use the HTML
app.use(express.static("public"));

// Routes
app.use("/api/v1", auth);

app.listen(PORT, () => {
  console.log("Server is running on port = ", PORT);
});
