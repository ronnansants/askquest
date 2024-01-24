const seq = require('sequelize')
const connec = require('./database');

const resposta = connec.define('respostas', {
    corpo: {
        type: seq.TEXT,
        allowNull: false,        
    },
    perguntaId: {
        type: seq.INTEGER,
        allowNull: false
    }
})

resposta.sync({force: false});
module.exports = resposta;