require('dotenv').config();
const express = require('express');
const cors = require('cors');
const parseConfig = require('./config/parseConfig');
const carroRoutes = require('./routes/carroRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const port = process.env.PORT || 5000; 

// Configuração do CORS e JSON
app.use(cors());
app.use(express.json());

// Configuração do Back4App
parseConfig();

// Rotas organizadas
app.use('/api/carros', carroRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/pedidos', pedidoRoutes); 

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
