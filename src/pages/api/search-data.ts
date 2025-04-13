import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchData } from '../../lib/types/searchTypes';
import { fetchSearchData } from '../../lib/api/fetchSearchData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    const { client, company, website, segment } = req.query;

    if (!client || !company || !website || !segment) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const data: SearchData = await fetchSearchData(
      client as string,
      company as string,
      website as string,
      segment as string
    );
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Failed to fetch search data' });
  }
}