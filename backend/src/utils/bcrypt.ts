import bcrypt from 'bcrypt';

class Bcrypt {
  private saltRounds: number = 10;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}

export default new Bcrypt();