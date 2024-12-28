const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/conections");
const bodyParser = require("body-parser");
const Vip = require("./models/Vip");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Express rodando na porta ${PORT}`);
});

//body parse
app.use(bodyParser.urlencoded({ extended: false }));

//heandlebars
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//static folder

app.use(express.static(path.join(__dirname, "public")));

//db conection
db.authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso!");
  })
  .catch((err) => {
    console.log("Alguma coisa deu errado com a conexão", err);
  });

// routes
app.get("/", (req, res) => {
  let search = req.query.vip;
  let query = "%" + search + "%";

  if (!search) {
    Vip.findAll({ order: [["name"]] })
      .then((vips) => {
        res.render("index", {
          vips,
        });
      })
      .catch((err) => console.log(err));
  } else {
    Vip.findAll({
      where: { rg: { [Op.like]: query } },
      order: [["name"]],
    })
      .then((vips) => {
        res.render("index", {
          vips,
          search,
        });
      })
      .catch((err) => console.log(err));
  }
});

//vips routes
app.use("/vips", require("./routes/vips"));
