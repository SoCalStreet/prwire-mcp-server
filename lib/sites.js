const SITES = [
  {
    id: 'cryptowiredaily',
    name: process.env.WP_SITE_1_NAME || 'Crypto Wire Daily',
    url: process.env.WP_SITE_1_URL || 'https://cryptowiredaily.io',
    user: process.env.WP_SITE_1_USER || '',
    pass: process.env.WP_SITE_1_APP_PASSWORD || ''
  },
  {
    id: 'tokeninsider',
    name: process.env.WP_SITE_2_NAME || 'Token Insider',
    url: process.env.WP_SITE_2_URL || 'https://tokeninsider.io',
    user: process.env.WP_SITE_2_USER || '',
    pass: process.env.WP_SITE_2_APP_PASSWORD || ''
  },
  {
    id: 'blockchainbriefing',
    name: process.env.WP_SITE_3_NAME || 'Blockchain Briefing',
    url: process.env.WP_SITE_3_URL || 'https://blockchainbriefing.io',
    user: process.env.WP_SITE_3_USER || '',
    pass: process.env.WP_SITE_3_APP_PASSWORD || ''
  },
  {
    id: 'digitalassetpost',
    name: process.env.WP_SITE_4_NAME || 'Digital Asset Post',
    url: process.env.WP_SITE_4_URL || 'https://digitalassetpost.com',
    user: process.env.WP_SITE_4_USER || '',
    pass: process.env.WP_SITE_4_APP_PASSWORD || ''
  }
];

export default SITES;
