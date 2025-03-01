const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');

// Rota de teste para verificar se `/api/pedidos` está ativo
router.get('/', (req, res) => {
    res.json({ mensagem: "API de pedidos funcionando!" });
});

// Definição das rotas para pedidos
router.post('/cadastrar', PedidoController.cadastrarPedido);
router.get('/listar', PedidoController.listarPedidos);
router.get('/buscar/:id', PedidoController.buscarPedidoPorId);
router.put('/atualizar/:id', PedidoController.atualizarPedido);
router.delete('/excluir/:id', PedidoController.excluirPedido);

module.exports = router;
