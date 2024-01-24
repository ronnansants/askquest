const seq = require('sequelize');
const connec = require('./database');

const Pergunta = connec.define('perguntas',
{
        titulo: { 
            type: seq.STRING, 
            allowNull: false
        },
        descricao: {
            type: seq.TEXT,
            allowNull: false
        }
});

Pergunta.sync({force: false}).then(() =>{
    console.log("Tabela PERGUNTAS sincronizada com sucesso!");
})

module.exports = Pergunta;