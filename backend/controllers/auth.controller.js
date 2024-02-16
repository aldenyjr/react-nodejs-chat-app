// Importando o módulo bcrypt para criptografia de senha
import bcrypt from 'bcryptjs';
// Importando o modelo de usuário
import User from '../models/user.model.js';
// Importando a função para gerar token JWT e configurar cookie
import generateTokenAndSetCookie from '../utils/generateToken.js';
// Importando o logger para adicionar logs
import logger from '../logs/logging.js';

// Função para registrar um novo usuário
export const signup = async (req, res) => {
  const setMessage = (code, message) => res.status(code).json({ message: message });

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

    // Se o usuário for criado com sucesso, gerar um token JWT e definir um cookie
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser.id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      logger.info('Invalid user data');
      setMessage(400, 'Invalid user data');
    }
  } catch (error) {
    logger.error(`Error in signup controller: ${error.message}`);
    setMessage(500, 'Internal Server Error');
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
        error: 'Invalid credentials, verify username or password',
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
    res.status(500).json({ error: 'Internal Server Error' });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
