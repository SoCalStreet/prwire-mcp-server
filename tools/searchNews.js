import { z } from 'zod';
import { searchPosts } from '../lib/wordpress.js';

export const schema = {
  query: z.string().min(1).describe('Search query to find articles'),
  site: z.enum(['cryptowiredaily', 'tokeninsider', 'blockchainbriefing', 'digitalassetpost']).optional().describe('Filter to a specific site (optional, defaults to all 4 sites)'),
  count: z.number().int().min(1).max(20).default(5).describe('Number of results to return (1-20, default 5)')
};

export async function handler({ query, site, count }) {
  const posts = await searchPosts(query, site, count || 5);

  if (posts.length === 0) {
    return { content: [{ type: 'text', text: `No articles found matching "${query}".` }] };
  }

  const lines = posts.map((p, i) =>
    `${i + 1}. **${p.title}**\n   ${p.site} | ${new Date(p.date).toLocaleDateString()}\n   ${p.excerpt.substring(0, 200)}${p.excerpt.length > 200 ? '...' : ''}\n   ${p.url}`
  );

  return {
    content: [{
      type: 'text',
      text: `Found ${posts.length} articles matching "${query}":\n\n${lines.join('\n\n')}`
    }]
  };
}
