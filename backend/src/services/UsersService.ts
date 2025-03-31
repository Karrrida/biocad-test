import prisma from '../db';
import Bcrypt from '../utils/bcrypt';

class UsersService {
  async createUser(email: string, password: string) {
    const hashPassword = await Bcrypt.hashPassword(password);
    return prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export default new UsersService();
