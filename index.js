const repository = require('./repositoy')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//Especificando formato JSON
app.use(bodyParser.json())


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//Ouvindo servidor em sua respectiva porta
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}.`)
})

//Rotas
app.get('/pessoas', repository.getPessoas)
app.get('/pessoas/:id', repository.getPessoasById)
app.post('/pessoas', repository.createPessoa)
app.put('/pessoas/:id', repository.updatePessoa)
app.delete('/pessoas/:id', repository.deletePessoa)