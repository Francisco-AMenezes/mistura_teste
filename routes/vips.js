const express = require("express");
const router = express.Router();
const Vip = require("../models/Vip");

// testing route
router.get("/test", (req, res) => {
  res.send("Deu certo aqui, filhão!");
});

// details route
router.get("/view/:rg", (req, res) => {
  const { rg } = req.params;

  Vip.findOne({
    where: { rg: rg },
  })
    .then((vip) => {
      res.render("view", {
        vip,
      });
    })
    .catch((err) => console.log(err));
});

//send route
router.get("/add", (req, res) => {
  res.render("add");
});

//add vip by post method
router.post("/add", (req, res) => {
  let { name, rg, desconto } = req.body;

  Vip.create({
    name,
    desconto,
    rg,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
