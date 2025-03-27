import axios from 'axios';

interface Items {
  id: number;
  authorId?: number;
  description: string;
  text: string;
}

class Api {
  api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  getItems = async (): Promise<Items[] | []> => {
    try {
      const response = await this.api.get('/items');
      return response.data;
    } catch (err) {
      console.error('Get Items error: ', err);
      return [];
    }

  };

  login = async (data: object) => {
    try {
      await this.api.post('/auth/login', data);
    } catch (err) {
      console.error('Login error: ', err);
    }
  };

  register = async (data: object) => {
    try {
      const response = await this.api.post('/auth/register', data);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error('Login error: ', err);
    }
  };

  authMe = async () => {
    await this.api.get('auth/me');
  };

  updateItem = async (id: number, data: Items) => {
    const response = await this.api.patch(`/items/${id}`, data);
    console.log(response);
  };
}


export default new Api();

