import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { OpenMeteoAdapter } from '../../../../infra/weather/OpenMeteoAdapter';
import { OpenMeteoGeoAdapter } from '../../../../infra/geo/OpenMeteoGeoAdapter';

const querySchema = z.object({
    q: z.string().min(1),
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = querySchema.parse({
            q: searchParams.get('q'),
            start: searchParams.get('start') || undefined,
            end: searchParams.get('end') || undefined,
        });

        const geoAdapter = new OpenMeteoGeoAdapter();
        const location = await geoAdapter.geocode(query.q);

        const weatherAdapter = new OpenMeteoAdapter();
        const start = query.start ? new Date(query.start) : new Date();
        const end = query.end ? new Date(query.end) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const forecast = await weatherAdapter.fetchForecast(
            location.lat,
            location.lon,
            start,
            end
        );

        return NextResponse.json({ location, forecast });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid parameters', details: error.flatten() },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch forecast' },
            { status: 500 }
        );
    }
}
