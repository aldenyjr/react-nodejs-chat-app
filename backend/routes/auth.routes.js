// Importando o framework Express e as funções de controle de autenticação
import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

// Importando o middleware para proteger rotas
import protectRoute from '../middleware/protectRoute.js';

// Criando um novo router do Express
const router = express.Router();

// Rota para o registro de um novo usuário
router.post('/signup', signup);

// Rota para o login de um usuário existente
router.post('/login', login);

// Rota para o logout de um usuário autenticado
router.post('/logout', logout);

// Exportando o router para ser utilizado em outros arquivos
export default router;
