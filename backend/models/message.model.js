// Importando o mongoose para definir esquemas e modelos do MongoDB
import mongoose from 'mongoose';

// Definindo o esquema da mensagem
const messageSchema = new mongoose.Schema(
  {
    // ID do remetente da mensagem, referenciando o modelo User
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referência ao modelo User
      required: true, // Campo obrigatório
    },
    // ID do destinatário da mensagem, referenciando o modelo User
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referência ao modelo User
      required: true, // Campo obrigatório
    },
    // Conteúdo da mensagem
    message: {
      type: String,
      required: true, // Campo obrigatório
    },
  },
  // Opções do esquema: habilitando registro de timestamps
  { timestamps: true }
);

// Criando o modelo Message com base no esquema definido
const Message = mongoose.model('Message', messageSchema);

// Exportando o modelo Message para ser utilizado em outros arquivos
export default Message;
