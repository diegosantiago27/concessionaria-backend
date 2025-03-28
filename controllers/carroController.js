const Parse = require('parse/node');


const cadastrarCarro = async (req, res) => {
    try {
        const { modelo, ano, preco, status } = req.body;

        const Carro = Parse.Object.extend("Carro");
        const carro = new Carro();

        carro.set('modelo', modelo);
        carro.set('ano', ano);
        carro.set('preco', preco);
        carro.set('status', status);

        await carro.save();
        res.status(201).json(carro.toJSON());
    } catch (error) {
        res.status(500).send('Erro ao cadastrar carro: ' + error.message);
    }
};


const listarCarros = async (req, res) => {
    try {
        const Carro = Parse.Object.extend("Carro");
        const query = new Parse.Query(Carro);

        const results = await query.find();
        res.json(results.map(carro => carro.toJSON()));
    } catch (error) {
        res.status(500).send('Erro ao listar carros: ' + error.message);
    }
};


const buscarCarroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const Carro = Parse.Object.extend("Carro");
        const query = new Parse.Query(Carro);

        const carro = await query.get(id);
        res.json(carro.toJSON());
    } catch (error) {
        res.status(404).send('Carro não encontrado: ' + error.message);
    }
};


const atualizarCarro = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelo, ano, preco, status } = req.body;

        const Carro = Parse.Object.extend("Carro");
        const query = new Parse.Query(Carro);

        const carroParaAtualizar = await query.get(id);

        if (modelo) carroParaAtualizar.set('modelo', modelo);
        if (ano) carroParaAtualizar.set('ano', ano);
        if (preco) carroParaAtualizar.set('preco', preco);
        if (status) carroParaAtualizar.set('status', status);

        await carroParaAtualizar.save();
        res.json(carroParaAtualizar.toJSON());
    } catch (error) {
        res.status(500).send('Erro ao atualizar carro: ' + error.message);
    }
};


const excluirCarro = async (req, res) => {
    try {
        const { id } = req.params;
        const Carro = Parse.Object.extend("Carro");
        const query = new Parse.Query(Carro);

        const carroParaDeletar = await query.get(id);
        await carroParaDeletar.destroy();

        res.status(200).send('Carro excluído com sucesso');
    } catch (error) {
        res.status(500).send('Erro ao excluir carro: ' + error.message);
    }
};



