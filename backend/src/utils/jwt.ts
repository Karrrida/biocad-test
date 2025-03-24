import jwt from 'jsonwebtoken';


export const generateToken = (id: number, email: string, secret: string): string => {
  const lifetime = '3h';
  return jwt.sign({ id, email }, secret, { expiresIn: lifetime });
};