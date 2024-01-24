const express = require("express");
const app = express();
const connection = require('./database/database');
const MdPergunta = require('./database/Pergunta');
const MdResposta = require('./database/Resposta');

// Conectar no banco de dados
connection.authenticate().then(() => {
    console.log("Conectado com sucesso!")
}).catch((err) => {console.log("Problema ao se conectar com o banco. MSG: "+err)});

// Middleware para fazer o parsing do corpo das requisições
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Setando configurações
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Rotas
app.get("/", function(req, res) {
    MdPergunta.findAll({ 
        raw: true,
        order: [
            ['id', 'DESC']
        ]
     }).then((perguntas) => {
        res.render("index", {questions: perguntas})
    }).catch((err) => {
        console.log("Erro ao carregar as perguntas. MSG: "+err)
    })
});

app.get("/pergunta/:iden", function(req, res){
    let id = req.params.iden;

    MdPergunta.findOne({
        where:{id: id}
    }).then(pergunta => {
        if(pergunta){
            MdResposta.findAll({
                where: {perguntaId: id},
                raw: true,
                order: [['id', 'desc']]
            }).then((resposta) => {
                console.log(resposta);
                res.render("pergunta", {
                    tit: pergunta.titulo,
                    desc: pergunta.descricao,
                    id: pergunta.id,
                    resposta: resposta || []
                });
            }).catch(function(err){
                console.log("/pergunta/:iden erro na rota. Msg:"+err);
            })
        }else{
            res.redirect("/")
        }
    }).catch(err => {
        //alert("Pergunta não encontrada, por favor confirme!");
        console.log("Erro ao carregar a pergunta. MSG:"+err)
    })
});

app.get("/perguntar", function(req, res) {
    res.render("perguntar")
})

app.post("/responder/:id", function(req, res) {
    let resposta = req.body.answer;
    let id = req.params.id;

    MdResposta.create({
        corpo: resposta,
        perguntaId: id
    }).then(()=>{
        res.redirect('/pergunta/'+id)
    }).catch((err)=>{
        console.log("Erro ao responder a pergunta. MSG: "+err);
    })

})

app.post("/salvarpergunta", function(req, res){
    let tit = req.body.titulo;
    let desc = req.body.descricao;

    MdPergunta.create({
        titulo: tit, 
        descricao: desc
    }).then(()=>{
        res.redirect('/');
    })
    console.log("Pergunta salva com sucesso!")
})

app.listen(2205, () => {
    console.log('Servidor rodando na porta 2205')
});