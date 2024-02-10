// Importando o mongoose para conexão com o MongoDB
import mongoose from 'mongoose';

// Função para conectar ao MongoDB
const connectToMongoDB = async () => {
  try {
    // Conectar ao MongoDB usando a URI fornecida no arquivo .env
    await mongoose.connect(process.env.MONGO_DB_URI);
    // Exibir mensagem de sucesso ao conectar
    console.log('Connected to MongoDB');
  } catch (error) {
    // Exibir mensagem de erro caso ocorra algum problema na conexão
    console.log('Error connecting to MongoDB: ', error.message);
  }
};

// Exportar a função connectToMongoDB para ser utilizada em outros arquivos
export default connectToMongoDB;
