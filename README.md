# PRWire MCP Server

MCP server for PRWire — the permissionless newswire for crypto and digital assets.

## What This Does

Gives AI agents access to the PRWire network of 4 crypto publications. Agents can fetch the latest news, search articles, and submit press releases for instant distribution.

## Tools

### get_latest_news
Get the latest crypto news articles from the PRWire network.
- `limit` (optional): Number of articles to return (default: 10, max: 50)
- - `site` (optional): Filter by site — cryptowiredaily, tokeninsider, blockchainbriefing, digitalassetpost
 
  - ### search_news
  - Search for crypto news articles across the PRWire network.
  - - `query` (required): Search query
    - - `limit` (optional): Number of results (default: 10)
     
      - ### submit_press_release
      - Submit a press release for distribution across the PRWire network.
      - - `company_name` (required): Company name
        - - `contact_email` (required): Contact email
          - - `press_release` (required): Full press release text
            - - `website` (optional): Company website
             
              - ## Connect
             
              - SSE endpoint: `https://mcp.cryptowiredaily.io/sse`
             
              - ## The Network
             
              - - cryptowiredaily.io — wire/AP style, general crypto news
                - - tokeninsider.io — DeFi-native, technical audience
                  - - blockchainbriefing.io — institutional/Bloomberg style
                    - - digitalassetpost.com — fintech/accessible, bridges TradFi and crypto
