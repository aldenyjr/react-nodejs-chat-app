import { useState } from 'react';
import { BsSend } from 'react-icons/bs'; // Importa o ícone BsSend do react-icons
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message);
    setMessage('');
  };

  return (
    // Formulário de entrada de mensagem
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        {/* Campo de entrada de texto para digitar a mensagem */}
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white "
          placeholder="Send a message" // Placeholder para instruir o usuário a enviar uma mensagem
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* Botão para enviar a mensagem */}
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />} {/* Ícone de enviar mensagem */}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
