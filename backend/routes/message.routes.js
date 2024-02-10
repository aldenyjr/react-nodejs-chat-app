// Importando o framework Express e as funções de controle de mensagens
import express from 'express';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

// Importando o middleware para proteger rotas
import protectRoute from '../middleware/protectRoute.js';

// Criando um novo router do Express
const router = express.Router();

router.get('/:id', protectRoute, getMessage);

// Rota para enviar uma mensagem para um usuário específico
// Esta rota é protegida pelo middleware protectRoute, que verifica se o usuário está autenticado
// O parâmetro ':id' na rota indica o ID do usuário destinatário da mensagem
router.post('/send/:id', protectRoute, sendMessage);

// Exportando o router para ser utilizado em outros arquivos
export default router;
