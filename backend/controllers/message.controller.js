// Importando os modelos de conversa e mensagem
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

import logger from '../logs/logging.js';

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages');

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    await res.status(200).json(messages);
  } catch (error) {
    logger.error(`Error in getMessage controller: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Função para enviar uma mensagem
export const sendMessage = async (req, res) => {
  try {
    // Extrair o ID do destinatário da URL da requisição
    const { id: receiverId } = req.params;
    // Extrair a mensagem do corpo da requisição
    const { message } = req.body;
    // Extrair o ID do remetente da requisição, que foi adicionado pelo middleware protectRoute
    const senderId = req.user._id;

    // Procurar por uma conversa existente entre o remetente e o destinatário
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Se não existir uma conversa, criar uma nova
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Criar uma nova mensagem
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Adicionar o ID da nova mensagem à lista de mensagens na conversa
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //SOCKET IO FUNCTIONALITY WILL GO HERE

    // Salvar a conversa e a mensagem no banco de dados
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);

    // Responder com a mensagem criada
    res.status(201).json(newMessage);
  } catch (error) {
    logger.error(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
