const express = require('express');

const AlunoController = require('./controllers/AlunoController');

const routes = new express.Router();

// rotas
// create
routes.post('/alunos', AlunoController.store);

// read
routes.get('/alunos', AlunoController.list);
routes.get('/alunos/:ra', AlunoController.getOne);

// update
routes.put('/alunos/:ra', AlunoController.updateByRa);
routes.put('/alunos/admin/:id', AlunoController.updateById)

// delete
routes.delete('/alunos/:ra', AlunoController.removeByRa);
routes.delete('/alunos/admin/:id', AlunoController.removeById);

module.exports = routes;
