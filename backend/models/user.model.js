// Importando o mongoose para definir esquemas e modelos do MongoDB
import mongoose from 'mongoose';

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema(
  {
    // Nome completo do usuário
    fullName: {
      type: String,
      required: true, // Campo obrigatório
    },
    // Nome de usuário único
    userName: {
      type: String,
      required: true, // Campo obrigatório
      unique: true, // Deve ser único
    },
    // Senha do usuário
    password: {
      type: String,
      required: true, // Campo obrigatório
      minLength: 6, // Mínimo de 6 caracteres
    },
    // Gênero do usuário, permitindo apenas 'male' ou 'female'
    gender: {
      type: String,
      required: true, // Campo obrigatório
      enum: ['male', 'female'], // Apenas valores 'male' ou 'female' são permitidos
    },
    // URL da imagem de perfil do usuário, padrão vazio
    profilePic: {
      type: String,
      default: '', // Valor padrão é uma string vazia
    },
  },
  // Opções do esquema: habilitando registro de timestamps
  { timestamps: true }
);

// Criando o modelo User com base no esquema definido
const User = mongoose.model('User', userSchema);

// Exportando o modelo User para ser utilizado em outros arquivos
export default User;
