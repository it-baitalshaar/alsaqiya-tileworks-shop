import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';

const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

const sanity = createClient({
  projectId, 
  dataset,
  apiVersion: '2023-09-25',
  token,
  useCdn: false,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!token || !projectId || !dataset) {
    return res.status(500).json({ error: 'Server not configured for writes' });
  }

  try {
    const { productId, action } = req.body || {};
    if (!productId || !['like', 'unlike'].includes(action)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Use atomic inc/dec; ensure field exists
    const incValue = action === 'like' ? 1 : -1;
    const patch = sanity.patch(productId)
      .setIfMissing({ likes: 0 })
      .inc({ likes: incValue });

    const tx = sanity.transaction().patch(patch);
    await tx.commit();

    // Fetch latest likes
    const latest = await sanity.fetch<number>(`*[_id == $id][0].likes`, { id: productId });

    return res.status(200).json({ likes: Math.max(0, latest || 0) });
  } catch (err: any) {
    console.error('like api error', err);
    return res.status(500).json({ error: 'Failed to update likes' });
  }
}


