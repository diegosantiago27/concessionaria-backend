const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.post('/cadastrar', funcionarioController.cadastrarFuncionario);
router.get('/listar', funcionarioController.listarFuncionarios);
router.get('/buscar/:id', funcionarioController.buscarFuncionarioPorId);
router.put('/atualizar/:id', funcionarioController.atualizarFuncionario);
router.delete('/excluir/:id', funcionarioController.excluirFuncionario);

module.exports = router;
