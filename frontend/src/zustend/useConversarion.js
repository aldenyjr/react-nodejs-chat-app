// Importa a função 'create' da biblioteca Zustand
import { create } from 'zustand';

/*
Este código em JavaScript é uma implementação de um hook personalizado usando a biblioteca Zustand. O hook é chamado useConversation e é criado usando a função create fornecida pela biblioteca Zustand.
*/

// Define um hook personalizado 'useConversation' usando a função 'create'
const useConversation = create((set) => ({
  // Estado inicial para a conversa selecionada, inicialmente nulo
  selectedConversation: null,
  // Função para definir a conversa selecionada
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  // Estado inicial para as mensagens, inicialmente um array vazio
  messages: [],
  // Função para definir as mensagens
  setMessages: (messages) => set({ messages }),
}));

// Exporta o hook 'useConversation' como o export padrão do módulo
export default useConversation;
