const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carroController');

router.post('/cadastrar', carroController.cadastrarCarro);
router.get('/listar', carroController.listarCarros);
router.get('/buscar/:id', carroController.buscarCarroPorId);
router.put('/atualizar/:id', carroController.atualizarCarro);
router.delete('/excluir/:id', carroController.excluirCarro);

module.exports = router;
