import { Response, Request } from 'express';
import logger from './logger';


class CustomResponse {
  success<TReq extends Request>(req: TReq, res: Response, data: object, code: number = 200) {
    const result: object = {
      status: true,
      data: data,
    };

    res.removeHeader('X-Powered-By');
    res.status(code).json(result);
    logger.info({result},`[OUT: ${req.originalUrl}] [METHOD: ${req.method} ]]`)
  }

  failure<TReq extends Request>(req: TReq, res: Response, data: object, code: number = 200, err: Error = null) {
    const message: string | object = err ? 'internal server error' : data;
    const result: object = {
      status: false,
      message: message,
    };

    if(err) {
      logger.error({result, err: err}, `[OUT: ${req.originalUrl}] [METHOD: ${req.method}]`)
    }else{
      logger.info({result},`[OUT: ${req.originalUrl}] [METHOD: ${req.method} ]]`)
    }

    res.removeHeader('X-Powered-By');
    res.status(code).json(result);
  }
}


export default new CustomResponse();