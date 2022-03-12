const express = require("express")
const mysql = require("./mysql").pool
const transacoes = express();

transacoes.get("/",(req, res, next)=>{
    mysql.getConnection((error,conn)=>{
        conn.query("SELECT * FROM movimentacoes ", (error, result, field)=>{
            conn.release();
            if (error) {
                return res.status(401)
            }
            res.status(200).send(result)
        })
    })
})

transacoes.get("/:id",(req, res, next)=>{
    mysql.getConnection((error,conn)=>{
        conn.query(`SELECT * FROM movimentacoes  
                    WHERE movimentacoes.id_remetente = ? OR movimentacoes.id_destinatario = ?  
                    ORDER BY data`,
        [req.params.id, req.params.id], 
        (error, result, field)=>{
            conn.release();
            if (error) {
                return res.status(500).send({Resposta: "Sai daqui otario"})
            }
            res.send(result)
        })
    })
})

transacoes.post("/",(req, res, next)=>{
    const [remetente, destinatario, valor, tipo] = [req.body.id_remetente, req.body.id_destinatario, req.body.valor, req.body.tipo]
    mysql.getConnection((error,conn)=>{
        //
        conn.query(`INSERT INTO movimentacoes(id_remetente, id_destinatario, valor, tipo) VALUES(?,?,?,?)`,
        [remetente, destinatario, valor, tipo],
        (error, result, field)=>{
            conn.release();
            if (error) {
                return res.status(405).send({Resposta: "Nada feito nas movimentacoes"})
            }
            conn.query(`UPDATE clientes SET saldo = saldo - ? WHERE id_cliente = ?`, 
                        [valor, remetente], 
            (error, result, field)=>{

                if (error) {
                    return res.status(405).send({Resposta: "Nada feito no remetente"})
                }
                conn.query(`UPDATE clientes SET saldo = saldo + ? WHERE id_cliente = ?`, 
                [valor, destinatario], 
                (error, result, field)=>{
                    if (error) {
                        return res.status(405).send({Resposta: "Nada feito nos destinatário"})
                    }
                    res.status(200).send("terminado")
                })
            })
        })
    })
})
    

module.exports = transacoes;