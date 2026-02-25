import { z } from 'zod';
import { getLatestPosts } from '../lib/wordpress.js';

export const schema = {
  site: z.enum(['cryptowiredaily', 'tokeninsider', 'blockchainbriefing', 'digitalassetpost']).optional().describe('Filter to a specific site (optional, defaults to all 4 sites)'),
  count: z.number().int().min(1).max(20).default(5).describe('Number of articles to return (1-20, default 5)')
};

export async function handler({ site, count }) {
  const posts = await getLatestPosts(site, count || 5);

  if (posts.length === 0) {
    return { content: [{ type: 'text', text: 'No articles found.' }] };
  }

  const lines = posts.map((p, i) =>
    `${i + 1}. **${p.title}**\n   ${p.site} | ${new Date(p.date).toLocaleDateString()}\n   ${p.excerpt.substring(0, 200)}${p.excerpt.length > 200 ? '...' : ''}\n   ${p.url}`
  );

  return {
    content: [{
      type: 'text',
      text: `Latest ${posts.length} articles from PRWire network:\n\n${lines.join('\n\n')}`
    }]
  };
}
