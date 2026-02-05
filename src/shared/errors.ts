export class DomainError extends Error {
    constructor(message: string, public code: string) {
        super(message);
        this.name = 'DomainError';
    }
}

export class WeatherError extends DomainError {
    constructor(message: string) {
        super(message, 'WEATHER_FETCH_FAILED');
    }
}

export class GeoError extends DomainError {
    constructor(message: string) {
        super(message, 'GEOCODING_FAILED');
    }
}

export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message, 'VALIDATION_FAILED');
    }
}

export class RateLimitError extends DomainError {
    constructor() {
        super('Too many requests', 'RATE_LIMITED');
    }
}
