const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const app = require("./app");

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
