import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { GetOutfitRecommendationUseCase } from '../../../core/usecases/getOutfitRecommendation';
import { OpenMeteoAdapter } from '../../../infra/weather/OpenMeteoAdapter';
import { OpenMeteoGeoAdapter } from '../../../infra/geo/OpenMeteoGeoAdapter';
import { RateLimitError } from '../../../shared/errors';

// Simple in-memory rate limiter (MVP - resets on deploy)
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

const outfitRequestSchema = z.object({
    coldTolerance: z.number().int().min(0).max(100),
    gender: z.enum(['male', 'female']),
    locationQuery: z.string().min(1),
    dateStart: z.string().datetime(),
    dateEnd: z.string().datetime(),
});

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    return forwarded?.split(',')[0] || 'unknown';
}

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimiter.get(ip);

    if (!record || now > record.resetAt) {
        rateLimiter.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = getClientIP(request);
        if (!checkRateLimit(ip)) {
            throw new RateLimitError();
        }

        // Parse & validate body
        const body = await request.json();
        const validated = outfitRequestSchema.parse(body);

        // Execute use case
        // Execute use case
        const useCase = new GetOutfitRecommendationUseCase(
            new OpenMeteoAdapter(),
            new OpenMeteoGeoAdapter()
        );

        const recommendation = await useCase.execute(validated);

        return NextResponse.json(recommendation);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', code: 'VALIDATION_ERROR', details: error.flatten() },
                { status: 400 }
            );
        }

        if (error instanceof RateLimitError) {
            return NextResponse.json(
                { error: error.message, code: error.code },
                { status: 429 }
            );
        }

        if (error instanceof Error && 'code' in error) {
            return NextResponse.json(
                { error: error.message, code: (error as any).code },
                { status: 400 }
            );
        }

        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error', code: 'INTERNAL_ERROR' },
            { status: 500 }
        );
    }
}
