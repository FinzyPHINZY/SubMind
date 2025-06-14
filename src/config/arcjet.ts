import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/node';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ['ip.src'],
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: [
        'CATEGORY:SEARCH_ENGINE', // Google, Bing, etc
        'CURL',
        // 'CATEGORY:MONITOR', // Uptime monitoring services
        // 'CATEGORY:PREVIEW', // Link previews e.g. Slack, Discord
      ],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

export { aj as arcjet };
