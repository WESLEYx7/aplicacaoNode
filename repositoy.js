//Criando tabela
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_pessoas',
    password: '',
    port: 5432,
})

//Lisrando pessoas
const getPessoas = (request, response) => {
    pool.query('SELECT * FROM pessoas ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Listando pessoa pelo id
const getPessoasById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM pessoas WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//Criando pessoa
const createPessoa = (request, response) => {
    const { nome, email, telefone } = request.body
  
    pool.query('INSERT INTO pessoas (nome, email, telefone) VALUES ($1, $2, $3)', [nome, email, telefone], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Pessoa criada com sucesso.`)
    })
  }

//Atualizando pessoa
const updatePessoa = (request, response) => {
    const id = parseInt(request.params.id)
    const {  nome, email, telefone } = request.body

    pool.query(
        'UPDATE pessoas SET nome = $1, email = $2, telefone = $3 WHERE id = $4',
        [nome, email, telefone, id],
        (error, result) => {
            if ( error ) {
                throw error
            }
            response.status(200).send(`Pessoa ${id} atualizada com sucesso.`)
        }
    )
}

//Deletando pessoa
const deletePessoa = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM pessoas WHERE id = $1', [id], (error, result) => {
        if ( error ) {
            throw error
        }
        response.status(200).send(`Pessoa removida com sucesso!`)
    })
}

//Funções a serem exportadas
module.exports = {
    getPessoas,
    getPessoasById,
    createPessoa,
    updatePessoa,
    deletePessoa,
}