// Importando o mongoose para definir esquemas e modelos do MongoDB
import mongoose from 'mongoose';

// Definindo o esquema de conversa
const conversationSchema = new mongoose.Schema(
  {
    // Array de participantes da conversa, referenciando o modelo User
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referência ao modelo User
      },
    ],
    // Array de mensagens na conversa, referenciando o modelo Message
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Referência ao modelo Message
        default: [], // Valor padrão é um array vazio
      },
    ],
  },
  // Opções do esquema: habilitando registro de timestamps
  { timestamps: true }
);

// Criando o modelo Conversation com base no esquema definido
const Conversation = mongoose.model('Conversation', conversationSchema);

// Exportando o modelo Conversation para ser utilizado em outros arquivos
export default Conversation;
