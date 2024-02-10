// Importando os módulos necessários
import express from 'express'; // Importando o framework Express para criar a API
import dotenv from 'dotenv'; // Importando dotenv para carregar variáveis de ambiente de um arquivo .env
import cookieParser from 'cookie-parser'; // Importando cookie-parser para análise de cookies

// Importando as rotas de autenticação e de mensagens
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import usersRouter from './routes/user.routes.js';

// Importando a função para conectar ao MongoDB
import connectToMongoDB from './db/connetToMongoDB.js';

// Inicializando o aplicativo Express
const app = express();
const PORT = process.env.PORT || 5000; // Definindo a porta do servidor

// Carregando variáveis de ambiente do arquivo .env
dotenv.config();

// Configurando o aplicativo Express para usar JSON como formato de dados
app.use(express.json());

// Configurando o aplicativo Express para usar cookie-parser para analisar cookies
app.use(cookieParser());

// Definindo rotas para autenticação, mensagens e usuarios
app.use('/api/auth', authRoutes); // Rota para autenticação
app.use('/api/messages', messageRoutes); // Rota para mensagens
app.use('/api/users', usersRouter); // Rota para usuarios

// Iniciando o servidor Express na porta especificada
app.listen(PORT, () => {
  // Conectando ao MongoDB ao iniciar o servidor
  connectToMongoDB();
  // Exibindo mensagem no console indicando que o servidor está em execução
  console.log(`Server Running on port ${PORT}`);
});
