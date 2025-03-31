import { Response } from 'express';
import { Item } from '@prisma/client';

export interface ApiResponse<T> {
  status: boolean;
  data: T | null;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface GetItemResponse {
  items: Item[];
  totalPages: number;
}

export type CreateItemResponse = Item;

export type UpdateItemResponse = Item;

export type TypedResponse<T> = Response<ApiResponse<T>>;