import prisma from '../db';
import { Item } from '@prisma/client';
import { GetItemResponse, PaginationParams } from '../types/api-response';

class ItemsService {
  async create(title: string, userId: number): Promise<Item> {
    return prisma.item.create({
      data: {
        authorId: userId,
        title,
      },
    });
  }

  async findItemById(id: number): Promise<Item | null> {
    return prisma.item.findUnique({
      where: { id },
    });
  }

  async update(id: number, title: string): Promise<Item> {
    return prisma.item.update({
      where: { id },
      data: {
        title,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.item.delete({
      where: { id },
    });
  }

  async findItems({ page, perPage }: PaginationParams): Promise<GetItemResponse> {
    const skip = (page - 1) * perPage;
    const [items, total] = await Promise.all([
      prisma.item.findMany({
        skip,
        take: perPage,
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.item.count(),
    ]);

    return {
      items,
      totalPages: Math.ceil(total / perPage),
    };
  }
}

export default new ItemsService();