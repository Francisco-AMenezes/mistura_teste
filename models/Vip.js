const Sequelize = require("sequelize");
const db = require("../db/conections");

const Vip = db.define("vips", {
  name: {
    type: Sequelize.STRING,
  },
  rg: {
    type: Sequelize.INTEGER,
  },
  desconto: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Vip;
