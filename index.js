const chalk = require("chalk");
require("dotenv").config();

const app = require("./app");
const port = process.env.PORT || 7000;

require('./config/configureDb.js');

app.listen(port, () => {
    console.log(chalk.inverse.bold.green(' SUCCESS ') + ` Server is running on port ${port}`);
});