const express = require("express");
const db = require("./src/repository/models");
const routes = require("./src/routes/Route");
const cors = require("cors");
const path = require("path");
// const bodyParser = require('body-parser');

class App {
  server;
  port;
  setServer() {
    this.server = express();

    this.server.use(express.json({ limit: "30mb", extended: true }));
    this.server.use(express.urlencoded({ limit: "30mb", extended: true }));
    this.server.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
      })
    );
  }

  setPort() {
    this.port = process.env.PORT || 3000;
  }

  async dbConnection() {
    try {
      await db.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  setRoutes() {
    routes(this.server);
  }

  async startServer() {
    await this.server.listen(this.port);
    console.info(`Server running on *:${this.port}`);
  }

  async start() {
    this.setServer();
    this.setPort();
    this.setRoutes();
    await this.dbConnection();
    await this.startServer();
  }
}

module.exports = App;
