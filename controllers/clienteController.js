const Parse = require('parse/node');

// Cadastrar um novo cliente
const cadastrarCliente = async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;

        const Cliente = Parse.Object.extend("Cliente");
        const cliente = new Cliente();

        cliente.set('nome', nome);
        cliente.set('email', email);
        cliente.set('telefone', telefone);

        await cliente.save();
        res.status(201).json(cliente.toJSON());
    } catch (error) {
        res.status(500).send('Erro ao cadastrar cliente: ' + error.message);
    }
};

// Listar todos os clientes
const listarClientes = async (req, res) => {
    try {
        const Cliente = Parse.Object.extend("Cliente");
        const query = new Parse.Query(Cliente);

        const results = await query.find();
        res.json(results.map(cliente => cliente.toJSON()));
    } catch (error) {
        res.status(500).send('Erro ao listar clientes: ' + error.message);
    }
};

// Buscar um cliente pelo ID
const buscarClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const Cliente = Parse.Object.extend("Cliente");
        const query = new Parse.Query(Cliente);

        const cliente = await query.get(id);
        res.json(cliente.toJSON());
    } catch (error) {
        res.status(404).send('Cliente não encontrado: ' + error.message);
    }
};


const atualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;

        const Cliente = Parse.Object.extend("Cliente");
        const query = new Parse.Query(Cliente);
        const clienteParaAtualizar = await query.get(id);

        if (nome) clienteParaAtualizar.set('nome', nome);
        if (email) clienteParaAtualizar.set('email', email);
        if (telefone) clienteParaAtualizar.set('telefone', telefone);
        
        await clienteParaAtualizar.save();
        res.json(clienteParaAtualizar.toJSON());
    } catch (error) {
        res.status(500).send('Erro ao atualizar cliente: ' + error.message);
    }
};


const excluirCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const Cliente = Parse.Object.extend("Cliente");
        const query = new Parse.Query(Cliente);

        const clienteParaDeletar = await query.get(id);
        await clienteParaDeletar.destroy();

        res.status(200).send('Cliente excluído com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao excluir cliente: ' + error.message);
    }
};


module.exports = {
    cadastrarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente,
    excluirCliente
};
