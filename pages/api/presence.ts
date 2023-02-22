import type { NextApiRequest, NextApiResponse } from 'next';

type Participant = {
  id: string;
  userId: string | null;
  userName: string;
  joinTime: string;
  duration: number;
  room: string;
};

type Data = {
  participants: Participant[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
    };

    const apiUrl = process.env.DAILY_API_URL || 'https://api.daily.co/v1';
    const url = `${apiUrl}/rooms/${process.env.NEXT_PUBLIC_DAILY_ROOM}/presence`;

    const dailyRes = await fetch(url, options);
    const { data } = await dailyRes.json();
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=3, stale-while-revalidate'
    );
    return res.status(200).json({ participants: data });
  }
  return res.status(500);
}
