import { RateLimiter } from './RateLimiter';

interface TokenBucket {
    tokens: number;
    lastRefill: number;
}

export class InMemoryRateLimiter implements RateLimiter {
    private buckets: Map<string, TokenBucket> = new Map();
    private readonly capacity: number;
    private readonly refillRate: number; // tokens per second

    constructor(capacity: number = 10, refillRate: number = 1) {
        this.capacity = capacity;
        this.refillRate = refillRate;
    }

    async isAllowed(key: string): Promise<boolean> {
        const now = Date.now();
        const bucket = this.buckets.get(key) || { tokens: this.capacity, lastRefill: now };

        // Calculate refill
        const elapsedSeconds = (now - bucket.lastRefill) / 1000;
        const newTokens = Math.floor(elapsedSeconds * this.refillRate);

        if (newTokens > 0) {
            bucket.tokens = Math.min(this.capacity, bucket.tokens + newTokens);
            bucket.lastRefill = now;
        }

        if (bucket.tokens >= 1) {
            bucket.tokens -= 1;
            this.buckets.set(key, bucket);
            return true;
        }

        this.buckets.set(key, bucket);
        return false;
    }
}
