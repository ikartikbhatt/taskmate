const chalk = require("chalk");

function serverListenMessage() {
  console.log(chalk.cyan.bold("===================================="));
  console.log(chalk.yellow.bold("🚀  TASK MATE SERVER STARTED  🚀"));
  console.log(chalk.green.bold("Project: TASK MATE"));
  console.log(chalk.magenta.bold("Contributors: Shubham Ratra & Kartik Bhatt"));
  console.log(chalk.blue(`Server running at: ${process.env.ORIGIN_URL}`));
  console.log(chalk.cyan.bold("===================================="));
}

module.exports = serverListenMessage;
