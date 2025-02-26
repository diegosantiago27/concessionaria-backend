const Parse = require('parse/node');

// 🚀 Cadastrar um novo funcionário
const cadastrarFuncionario = async (req, res) => {
    try {
        const { nome, cargo, salario } = req.body;

        const Funcionario = Parse.Object.extend("Funcionario");
        const funcionario = new Funcionario();

        funcionario.set('nome', nome);
        funcionario.set('cargo', cargo);
        funcionario.set('salario', salario);

        await funcionario.save();
        res.status(201).json(funcionario.toJSON());
    } catch (error) {
        res.status(500).send('Erro ao cadastrar funcionário: ' + error.message);
    }
};

// 🚀 Listar todos os funcionários
const listarFuncionarios = async (req, res) => {
    try {
        const Funcionario = Parse.Object.extend("Funcionario");
        const query = new Parse.Query(Funcionario);

        const results = await query.find();
        res.json(results.map(funcionario => funcionario.toJSON()));
    } catch (error) {
        res.status(500).send('Erro ao listar funcionários: ' + error.message);
    }
};

// 🚀 Buscar um funcionário pelo ID
const buscarFuncionarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "ID do funcionário é obrigatório." });
        }

        const Funcionario = Parse.Object.extend("Funcionario");
        const query = new Parse.Query(Funcionario);
        const funcionario = await query.get(id);

        if (!funcionario) {
            return res.status(404).json({ message: "Funcionário não encontrado." });
        }

        res.json(funcionario.toJSON());
    } catch (error) {
        if (error.code === 101) {
            return res.status(404).json({ message: "Servidor inoperante." });
        }
        res.status(500).json({ message: "Erro ao buscar funcionário.", error: error.message });
    }
};

// 🚀 Atualizar um funcionário pelo ID
const atualizarFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cargo, salario } = req.body;

        const Funcionario = Parse.Object.extend("Funcionario");
        const query = new Parse.Query(Funcionario);

        const funcionarioParaAtualizar = await query.get(id);

        if (nome) funcionarioParaAtualizar.set('nome', nome);
        if (cargo) funcionarioParaAtualizar.set('cargo', cargo);
        if (salario) funcionarioParaAtualizar.set('salario', salario);

        await funcionarioParaAtualizar.save();
        res.json(funcionarioParaAtualizar.toJSON());
    } catch (error) {
        res.status(500).send('Erro ao atualizar funcionário: ' + error.message);
    }
};

// 🚀 Excluir um funcionário pelo ID
const excluirFuncionario = async (req, res) => {
    try {
        const { id } = req.params;
        const Funcionario = Parse.Object.extend("Funcionario");
        const query = new Parse.Query(Funcionario);

        const funcionarioParaDeletar = await query.get(id);
        await funcionarioParaDeletar.destroy();

        res.status(200).send('Funcionário excluído com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao excluir funcionário: ' + error.message);
    }
};

// Exportando todas as funções do controller
module.exports = {
    cadastrarFuncionario,
    listarFuncionarios,
    buscarFuncionarioPorId,
    atualizarFuncionario,
    excluirFuncionario
};
