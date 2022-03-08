const express = require("express");
const clientes = require("./clientes")
const transacoes = require("./transacoes")
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())
app.use("/clientes", clientes)
app.use("/transacoes", transacoes)

app.get("/", (req, res, next) => {
    res.send({
        message: "escolha a rota desejada",
        Clientes: "http://localhost:4000/clientes",
        transacoes: "http://localhost:4000/transacoes",
})
})


app.listen(4000);




