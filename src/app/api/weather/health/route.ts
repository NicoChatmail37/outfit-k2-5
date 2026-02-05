import { NextResponse } from 'next/server';
import { OpenMeteoAdapter } from '../../../../infra/weather/OpenMeteoAdapter';

export async function GET() {
    try {
        const weatherAdapter = new OpenMeteoAdapter();
        const isHealthy = await weatherAdapter.healthCheck();

        if (!isHealthy) {
            return NextResponse.json(
                { ok: false, errorCode: 'WEATHER_PROVIDER_UNREACHABLE' },
                { status: 503 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json(
            { ok: false, errorCode: 'HEALTH_CHECK_FAILED' },
            { status: 500 }
        );
    }
}
