import prisma from '../db';
import Bcrypt from '../utils/bcrypt';

class UsersService {
  async createUser(email: string, password: string) {
    const hashPassword = await Bcrypt.hashPassword(password);
    return prisma.users.create({
      data: {
        email,
        password: hashPassword,
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email },
    });
  }
}

export default new UsersService();
