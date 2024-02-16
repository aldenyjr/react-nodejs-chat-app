import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustend/useConversarion';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat chat-end' : 'chat chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  return (
    // Container principal da mensagem de chat
    <div className={chatClassName}>
      {/* Imagem do usuário */}
      <div className="chat-image avatar">
        {/* Imagem redonda com bordas arredondadas */}
        <div className="w-10 rounded-full">
          {/* Imagem do usuário */}
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      {/* Bolha de chat contendo a mensagem */}
      <div className="chat-bubble text-white bg-blue-500">{message.message}</div>
      {/* Rodapé da mensagem de chat contendo o horário */}
      <div className="chat-footer opacity-50 text-xs flex gap-1 pt-1 items-center">{message.createdAt}</div>
    </div>
  );
};

export default Message;
