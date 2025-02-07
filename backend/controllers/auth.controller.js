// Importando o módulo bcrypt para criptografia de senha
import bcrypt from 'bcryptjs';
// Importando o mongoose para tratamento de erros de validação
import mongoose from 'mongoose';
// Importando o modelo de usuário
import User from '../models/user.model.js';
// Importando a função para gerar token JWT e configurar cookie
import generateTokenAndSetCookie from '../utils/generateToken.js';
// Importando o logger para adicionar logs
import logger from '../logs/logging.js';

// Função para registrar um novo usuário
export const signup = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      logger.info("Passwords don't match");
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Verificar se o nome de usuário já está em uso
    const user = await User.findOne({ userName });
    if (user) {
      logger.info(`Username already exists: (username: ${userName})`);
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Verificar se a senha é uma string válida
    if (typeof password !== 'string') {
      logger.info('Password must be a string');
      return res.status(400).json({ message: 'Password must be a string' });
    }

    // Verificar se a senha tem o tamanho minimo de 6 caracteres
    if (password.length < 6) {
      logger.info('The password must contain at least 6 characters');
      return res.status(400).json({ message: 'The password must contain at least 6 characters' });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(password, salt);

    // Definir URLs para imagens de perfil baseadas no gênero
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // Criar um novo usuário
    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    // Salvar o novo usuário no banco de dados
    await newUser.save();

    // Gerar um token JWT e definir um cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Responder com os detalhes do usuário
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    logger.error(`Error in signup controller: ${error.message}`);

    // Tratar erros de validação do Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    // Tratar outros erros
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Função para realizar o login do usuário
export const login = async (req, res) => {
  try {
    // Extrair o nome de usuário e senha do corpo da requisição
    const { userName, password } = req.body;

    // Encontrar o usuário no banco de dados
    const user = await User.findOne({ userName });

    // Verificar se a senha está correta
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

    // Se o usuário não existir ou a senha estiver incorreta, retornar um erro
    if (!user || !isPasswordCorrect) {
      logger.info(`Invalid credentials, verify username or password: (username: ${userName})`);
      return res.status(400).json({
        message: 'Invalid credentials, verify username or password',
      });
    }

    // Gerar um token JWT e definir um cookie
    generateTokenAndSetCookie(user._id, res);

    // Responder com os detalhes do usuário
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    logger.error(`Error in login controller: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Função para realizar o logout do usuário
export const logout = (req, res) => {
  try {
    // Limpar o cookie JWT
    res.cookie('jwt', '', { maxAge: 0 });
    // Responder com uma mensagem de sucesso
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error(`Error in logout controller: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};