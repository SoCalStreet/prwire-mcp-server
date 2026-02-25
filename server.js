import 'dotenv/config';
import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';

import { schema as getLatestNewsSchema, handler as getLatestNewsHandler } from './tools/getLatestNews.js';
import { schema as searchNewsSchema, handler as searchNewsHandler } from './tools/searchNews.js';
import { schema as submitReleaseSchema, handler as submitReleaseHandler } from './tools/submitRelease.js';

const server = new McpServer({
  name: 'PRWire',
  version: '1.0.0'
});

server.tool('get_latest_news', 'Get the latest crypto news articles from the PRWire network (4 publications)', getLatestNewsSchema, getLatestNewsHandler);
server.tool('search_news', 'Search for crypto news articles across the PRWire network', searchNewsSchema, searchNewsHandler);
server.tool('submit_press_release', 'Submit a press release for distribution across the PRWire network', submitReleaseSchema, submitReleaseHandler);

const app = express();
const transports = {};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'PRWire MCP', version: '1.0.0', tools: ['get_latest_news', 'search_news', 'submit_press_release'] });
});

app.get('/sse', async (req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on('close', () => { delete transports[transport.sessionId]; });
  await server.connect(transport);
});

app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transports[sessionId];
  if (!transport) {
    res.status(400).json({ error: 'Invalid session ID' });
    return;
  }
  await transport.handlePostMessage(req, res);
});

const PORT = process.env.MCP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`PRWire MCP Server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`SSE: http://localhost:${PORT}/sse`);
});
