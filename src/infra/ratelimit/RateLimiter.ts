export interface RateLimiter {
    isAllowed(key: string): Promise<boolean>;
}
