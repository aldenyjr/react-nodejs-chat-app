// Importando a biblioteca jsonwebtoken para geração de tokens JWT
import jwt from 'jsonwebtoken';

// Função para gerar um token JWT e definir um cookie
const generateTokenAndSetCookie = (userId, res) => {
  // Gerar um token JWT com o ID do usuário fornecido
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Token expira em 15 dias
  });

  // Definir um cookie chamado "jwt" com o token gerado
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Tempo de vida do cookie em milissegundos (15 dias)
    httpOnly: true, // Apenas acessível via HTTP, impedindo ataques XSS
    sameSite: 'strict', // Restringir o cookie a solicitações do mesmo site, impedindo ataques CSRF
    secure: process.env.NODE_ENV !== 'development', // Definir como verdadeiro apenas em ambientes de produção para uso de HTTPS
  });
};

// Exportar a função generateTokenAndSetCookie para ser utilizada em outros arquivos
export default generateTokenAndSetCookie;
