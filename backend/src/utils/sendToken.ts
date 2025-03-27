import { Response } from 'express';

const sendToken = (res: Response, token: string): void => {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
};

export default sendToken;