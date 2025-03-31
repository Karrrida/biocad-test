import axios, { AxiosInstance } from 'axios';
import { Item } from './types/types.ts';

interface GetItemsResponse {
  data: Item[] | [];
  totalPages: number;
}

class Api {

  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.api.interceptors.response.use((response) =>
        response,
      (err) => {
        return Promise.reject(err);
      });
  }


  getItems = async (params?: { page: number, perPage: number }): Promise<GetItemsResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', String(params?.page));
    queryParams.append('perPage', String(params?.perPage));
    const response = await this.api.get(`/items?${queryParams.toString()}`);
    return {
      data: response.data.data.items,
      totalPages: response.data.data.totalPages,
    };
  };

  createItem = async (data: Item): Promise<Item> => {
    const response = await this.api.post('/items', data);
    return response.data.data;
  };

  updateItem = async (id: number | undefined, data: Item) => {
    const response = await this.api.patch(`/items/${id}`, data);
    return response.data.data;
  };

  deleteItem = async (id: number): Promise<void> => {
    await this.api.delete(`/items/${id}`);
  };

  login = async (data: object) => {
    await this.api.post('/auth/login', data);
  };

  register = async (data: object) => {
    const response = await this.api.post('/auth/register', data);
    return response.data;

  };

  authMe = async () => {
    const response = await this.api.get('auth/me');
    return response.data;
  };
}


export default new Api();

