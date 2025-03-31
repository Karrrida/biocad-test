import { Request } from 'express';
import { ParsedQs } from 'qs';

export interface DecodedUser {
  id: number;
  email: string;
}

export interface CreateItemRequest {
  title: string;
}

export interface UpdateItemRequest {
  title: string;
}

export interface DeleteItemParams {
  id: string;
}

export interface GetItemsQuery {
  page?: string;
  perPage?: string;
}

export interface CustomRequest<TDecoded = any, TBody = any, TQuery extends ParsedQs = ParsedQs> extends Request {
  decoded?: TDecoded;
  body: TBody;
  query: TQuery;
}