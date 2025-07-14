import { Request, Response } from 'express';
import ResponseApi from '../utils/apiResponse.util';

const TestRoute = (req: Request, res: Response) => {
  try {
    ResponseApi(res, 200, 'Hello, Shardendu Mishra here!', {
      exampleKey: 'exampleValue',
    });
  } catch (err) {
    ResponseApi(res, 500, 'How Did You Fail This ??', err);
  }
};

export { TestRoute };
