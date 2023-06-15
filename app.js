const express = require("express");
const routeWithSql = require("./routes/testDB");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routeWithSql);

app.listen(3000, () => {
  console.log("Server is listening on port 30000");
});
