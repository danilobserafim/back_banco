const express = require("express")

const transacoes = express();

transacoes.get("/",(req, res, next)=>{
    res.send({Message: "OK"})
})

module.exports = transacoes;