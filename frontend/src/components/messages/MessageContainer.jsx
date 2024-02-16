import { useEffect } from 'react';
import useConversation from '../../zustend/useConversarion'; // Importa o hook personalizado useConversation
import MessageInput from './MessageInput'; // Importa o componente MessageInput
import Messages from './Messages'; // Importa o componente Messages

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation(); // Usa o hook useConversation para obter a conversa selecionada e a função para definir a conversa selecionada

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        // Se não houver uma conversa selecionada, exibe o componente NoChatSelected
        <NoChatSelected />
      ) : (
        <>
          {/* Cabeçalho da conversa */}
          {/* Este trecho de código está comentado para desabilitar o cabeçalho */}
          {/* Barra de informações da conversa */}
          <div className="bg-slate-500 px-4 py-3 mb-2">
            <span className="label-text">
              To: <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span> {/* Nome do destinatário */}
            </span>
          </div>
          {/* Exibe as mensagens da conversa */}
          <Messages />
          {/* Componente para inserir mensagens */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

import { TiMessages } from 'react-icons/ti'; // Importa o ícone TiMessages do react-icons
import { useAuthContext } from '../../context/AuthContext';

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return (
    // Exibe uma mensagem quando nenhuma conversa está selecionada
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>{`Welcome ${authUser.fullName}`}!</p> {/* Mensagem de boas-vindas */}
        <p>Select a chat to start messaging</p> {/* Instrução para selecionar uma conversa */}
        <TiMessages className="text-3xl md:text-6xl text-center" /> {/* Ícone de mensagens */}
      </div>
    </div>
  );
};
