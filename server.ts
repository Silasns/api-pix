const express = require('express');
const fs = require('fs');

const porta = 3000;

const app = express();

app.use(express.json());

app.listen(porta, function () {
    console.log(`Servidor rodando na porta ${porta}`)
})

app.post("/api/v1/chave-pix", function (req, resp) {
    let chave = `${req.body.id},${req.body.nome},${req.body.banco},${req.body.chavepix};`

    fs.appendFile("./dados/pix.csv", chave, function (error) {
        if (error) {
            resp.status(500).json({
                "status" : "500",
                "mensagem" : `Erro: ${error}`
            })
        }else {
            resp.status(201).json({
                "status" : "201",
                "mensagem" : "Chave pix cadastrada com sucesso"
            })
        }
    })
})

app.get("/api/v1/chave-pix", function (req, resp) {
    fs.readFile("./dados/pix.csv", "utf8", function (error, data) {
        if (error) {
            console.log("Erro ao ler arquivo");
            resp.status(500).json({
                "status" : "500",
                "mensagem" : "Error ao ler arquivo"
            })

        }else {
            let dados = data.split(";")
            dados.pop()
            resp.status(200).send(dados)
        }
        
    })
})

