const express = require("express");
const cors = require("cors");
require("./models")

const app = express();

app.use(cors());
app.use(express.json());

app.use(require("./routes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});