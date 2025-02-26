const Parse = require('parse/node');

// 🚀 Cadastrar um novo pedido
const cadastrarPedido = async (req, res) => {
    try {
        const { clienteId, carroId, status } = req.body;

        if (!clienteId || !carroId || !status) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios (clienteId, carroId, status)" });
        }

        const Pedido = Parse.Object.extend("Pedido");
        const pedido = new Pedido();

        const Cliente = Parse.Object.extend("Cliente");
        const Carro = Parse.Object.extend("Carro");

        // Buscar cliente e carro no banco
        const cliente = await new Parse.Query(Cliente).get(clienteId);
        const carro = await new Parse.Query(Carro).get(carroId);

        if (!cliente || !carro) {
            return res.status(404).json({ message: "Cliente ou Carro não encontrados." });
        }

        pedido.set('cliente', cliente);
        pedido.set('carro', carro);
        pedido.set('status', status);
        pedido.set('data', new Date());

        await pedido.save();
        res.status(201).json(pedido.toJSON());

    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar pedido', error: error.message });
    }
};

// 🚀 Listar todos os pedidos
const listarPedidos = async (req, res) => {
    try {
        const Pedido = Parse.Object.extend("Pedido");
        const query = new Parse.Query(Pedido);
        query.include("cliente");
        query.include("carro");

        const pedidos = await query.find();

        res.json(pedidos.map(pedido => ({
            id: pedido.id,
            cliente: pedido.get("cliente")?.get("nome") || "Desconhecido",
            carro: pedido.get("carro")?.get("modelo") || "Desconhecido",
            status: pedido.get("status"),
            data: pedido.get("data"),
        })));

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
    }
};

// 🚀 Buscar um pedido pelo ID
const buscarPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "O ID do pedido é obrigatório." });
        }

        const Pedido = Parse.Object.extend("Pedido");
        const query = new Parse.Query(Pedido);
        query.include("cliente");
        query.include("carro");

        const pedido = await query.get(id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        res.json({
            id: pedido.id,
            cliente: pedido.get("cliente")?.get("nome") || "Desconhecido",
            carro: pedido.get("carro")?.get("modelo") || "Desconhecido",
            status: pedido.get("status"),
            data: pedido.get("data"),
        });

    } catch (error) {
        if (error.code === 101) {
            return res.status(404).json({ message: "Pedido não encontrado. Verifique o ID e tente novamente." });
        }
        res.status(500).json({ message: "Erro ao buscar pedido.", error: error.message });
    }
};

// 🚀 Atualizar um pedido pelo ID
const atualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { carro, cliente, status } = req.body;

        const Pedido = Parse.Object.extend("Pedido");
        const query = new Parse.Query(Pedido);

        const pedidoParaAtualizar = await query.get(id);

        if (carro) {
            const Carro = Parse.Object.extend("Carro");
            const carroPointer = new Carro();
            carroPointer.id = carro.objectId;
            pedidoParaAtualizar.set('carro', carroPointer);
        }

        if (cliente) {
            const Cliente = Parse.Object.extend("Cliente");
            const clientePointer = new Cliente();
            clientePointer.id = cliente.objectId;
            pedidoParaAtualizar.set('cliente', clientePointer);
        }

        if (status) pedidoParaAtualizar.set('status', status);

        await pedidoParaAtualizar.save();
        res.json(pedidoParaAtualizar.toJSON());

    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar pedido', error: error.message });
    }
};

// 🚀 Excluir um pedido pelo ID
const excluirPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const Pedido = Parse.Object.extend("Pedido");
        const query = new Parse.Query(Pedido);

        const pedidoParaDeletar = await query.get(id);

        if (pedidoParaDeletar.get("status") === "Concluído") {
            return res.status(400).json({ message: "Não é possível excluir um pedido concluído." });
        }

        await pedidoParaDeletar.destroy();
        res.status(200).json({ message: "Pedido excluído com sucesso!" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir pedido", error: error.message });
    }
};

// Exportando todas as funções do controller
module.exports = {
    cadastrarPedido,
    listarPedidos,
    buscarPedidoPorId,
    atualizarPedido,
    excluirPedido
};
