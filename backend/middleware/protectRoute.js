// Importando o módulo jsonwebtoken para verificação de token JWT
import jwt from 'jsonwebtoken';
// Importando o modelo de usuário
import User from '../models/user.model.js';

// Middleware para proteger rotas, verificando a presença e validade do token JWT
const protectRoute = async (req, res, next) => {
  try {
    // Verificar se o token JWT está presente nos cookies da requisição
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
    }

    // Verificar se o token JWT é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }

    // Buscar o usuário associado ao ID contido no token
    const user = await User.findById(decoded.userId).select('-password');

    // Verificar se o usuário existe
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    }

    // Adicionar o objeto do usuário à requisição para ser acessado nas rotas protegidas
    req.user = user;

    // Chamar a próxima função de middleware na cadeia
    next();
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Exportar o middleware protectRoute para ser utilizado em outros arquivos
export default protectRoute;
