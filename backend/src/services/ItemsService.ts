import prisma from '../db';

class ItemsService {
  async create(description: string, text: string, userId: number): Promise<void> {
    await prisma.items.create({
      data: {
        authorId: userId,
        description,
        text,
      },
    });
  }

  async findItemById(id: number) {
    return prisma.items.findUnique({
      where: { id },
    })
  }

  async update( id: number, text: string, description: string){
    await prisma.items.update({
      where: { id },
      data: {
        description,
        text
      }
    })
  }

  async delete( id: number){
    await prisma.items.delete({
      where: { id },
    })
  }

  async findItems() {
    return prisma.items.findMany();
  }
}

export default new ItemsService();