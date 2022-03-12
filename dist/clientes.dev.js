"use strict";

var express = require("express");

var mysql = require('./mysql').pool;

var clientes = express();
clientes.get("/", function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    conn.query("select * from clientes", function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.send({
          Message: "Something is Wrong"
        });
      }

      res.send(resultado);
    });
  });
});
clientes.get("/:id", function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    conn.query("select * from clientes where id_cliente = ?", [req.params.id], function (error, resultado, field) {
      conn.release();

      if (error || !resultado[0]) {
        return res.status(403).send({
          Message: "Cliente não encontrado"
        });
      }

      res.status(200).send(resultado);
    });
  });
});
clientes.post("/", function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    conn.query("INSERT INTO clientes(nome_completo, email, senha, saldo) VALUES(?, ?, ?, ?);", [req.body.nome_completo, req.body.email, req.body.senha, req.body.saldo], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          Message: "Something is Wrong"
        });
      }

      res.sendStatus(200);
    });
  });
});
clientes.patch("/", function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    conn.query("UPDATE clientes SET  nome_completo = ?, email = ?, senha = ?,  saldo = ? WHERE id_cliente = ?;", [req.body.nome_completo, req.body.email, req.body.senha, req.body.saldo, req.body.id_cliente], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.sendStatus(500);
      }

      res.sendStatus(200);
    });
  });
});
clientes["delete"]("/:id", function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    conn.query("DELETE FROM clientes WHERE id_cliente = ?;", [req.params.id], function (error, resultado, field) {
      conn.release();

      if (error) {
        return res.status(500).send({
          Message: "Something is Wrong"
        });
      }

      res.sendStatus(200);
    });
  });
});
clientes.post("/login", function (req, res, next) {
  mysql.getConnection(function (error, conn) {
    conn.query("select * from clientes where email = ?", [req.body.email], function (error, resultado, field) {
      conn.release();

      if (error || !resultado[0]) {
        return res.sendStatus(500);
      }

      if (resultado[0].senha === req.body.senha) {
        return res.status(200).send({
          id_cliente: resultado[0].id_cliente,
          nome_completo: resultado[0].nome_completo,
          email: resultado[0].email,
          saldo: resultado[0].saldo
        });
      }

      res.sendStatus(401);
    });
  });
});
module.exports = clientes;