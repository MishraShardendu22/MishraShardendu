import { Response } from 'express';

const ResponseApi = (
  res: Response,
  status: number,
  message: string,
  data: any = [],
  token?: string
) => {
  res.status(status).json({
    message,
    data,
    token,
  });
};

export default ResponseApi;
