"use strict";

var express = require("express");

var mysql = require("./mysql").pool;

var transacoes = express();
transacoes.get("/:id", function (req, res, next) {
  res.send({
    Message: "OK"
  });
});
module.exports = transacoes;