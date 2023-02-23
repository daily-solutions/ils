import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: process.env.NEXT_PUBLIC_DAILY_ROOM,
          is_owner: true,
        },
      }),
    };

    const apiUrl = process.env.DAILY_API_URL || 'https://api.daily.co/v1';
    const url = `${apiUrl}/meeting-tokens`;

    const dailyRes = await fetch(url, options);
    const { token } = await dailyRes.json();
    return res.status(200).json({ token });
  }
  return res.status(500);
}
