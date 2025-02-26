const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/cadastrar', clienteController.cadastrarCliente);
router.get('/listar', clienteController.listarClientes);
router.get('/buscar/:id', clienteController.buscarClientePorId);
router.put('/atualizar/:id', clienteController.atualizarCliente);
router.delete('/excluir/:id', clienteController.excluirCliente);

module.exports = router;
