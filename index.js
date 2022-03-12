const express = require("express");
const clientes = require("./clientes")
const movimentacoes = require("./movimentacoes")
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())
app.use("/clientes", clientes)
app.use("/movimentacoes", movimentacoes)

app.get("/", (req, res, next) => {
    res.send({
        message: "escolha a rota desejada",
        Clientes: "http://localhost:4002/clientes",
        movimentacoes: "http://localhost:4002/movimentacoes",
})
})


app.listen(4002);




