import SITES from './sites.js';

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#8217;/g, "'").replace(/&#8220;|&#8221;/g, '"').replace(/&nbsp;/g, ' ').replace(/\n+/g, ' ').trim();
}

export async function getLatestPosts(siteId, count) {
  const sites = siteId ? SITES.filter(s => s.id === siteId) : SITES;
  const fields = 'id,title,excerpt,link,date';
  const results = [];

  await Promise.all(sites.map(async (site) => {
    try {
      const res = await fetch(`${site.url}/wp-json/wp/v2/posts?per_page=${count}&orderby=date&_fields=${fields}`);
      if (!res.ok) return;
      const posts = await res.json();
      for (const post of posts) {
        results.push({
          site: site.name,
          title: stripHtml(post.title?.rendered),
          excerpt: stripHtml(post.excerpt?.rendered),
          url: post.link,
          date: post.date
        });
      }
    } catch (err) {
      console.error(`Failed to fetch from ${site.name}: ${err.message}`);
    }
  }));

  results.sort((a, b) => new Date(b.date) - new Date(a.date));
  return results.slice(0, count);
}

export async function searchPosts(query, siteId, count) {
  const sites = siteId ? SITES.filter(s => s.id === siteId) : SITES;
  const fields = 'id,title,excerpt,link,date';
  const results = [];

  await Promise.all(sites.map(async (site) => {
    try {
      const res = await fetch(`${site.url}/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=${count}&orderby=relevance&_fields=${fields}`);
      if (!res.ok) return;
      const posts = await res.json();
      for (const post of posts) {
        results.push({
          site: site.name,
          title: stripHtml(post.title?.rendered),
          excerpt: stripHtml(post.excerpt?.rendered),
          url: post.link,
          date: post.date
        });
      }
    } catch (err) {
      console.error(`Failed to search ${site.name}: ${err.message}`);
    }
  }));

  return results.slice(0, count);
}
