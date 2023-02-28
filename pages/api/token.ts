import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(500);
}
