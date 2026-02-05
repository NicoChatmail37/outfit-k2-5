import { WeatherPort } from '../../core/ports/WeatherPort';
import { WeatherSnapshot } from '../../core/domain/weather/types';
import { WeatherError } from '../../shared/errors';
import { env } from '../../shared/env';

interface OpenWeatherForecast {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        wind: { speed: number };
        pop: number;
        weather: Array<{ main: string; description: string }>;
    }>;
}

export class OpenWeatherAdapter implements WeatherPort {
    private readonly apiKey: string;
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

    constructor(apiKey: string = env.OPENWEATHER_API_KEY) {
        this.apiKey = apiKey;
    }

    async fetchForecast(
        lat: number,
        lon: number,
        dateStart: Date,
        dateEnd: Date
    ): Promise<WeatherSnapshot> {
        try {
            // For MVP, we use 5-day forecast (free tier)
            const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data: OpenWeatherForecast = await response.json();

            // Filter forecasts within date range and aggregate
            const startTs = dateStart.getTime() / 1000;
            const endTs = dateEnd.getTime() / 1000;

            const relevantForecasts = data.list.filter(f => f.dt >= startTs && f.dt <= endTs);

            // If no forecasts in range (dates too far), use all available
            const forecasts = relevantForecasts.length > 0 ? relevantForecasts : data.list;

            if (forecasts.length === 0) {
                throw new Error('No forecast data available');
            }

            // Aggregate statistics
            const temps = forecasts.map(f => f.main.temp);
            const minTemps = forecasts.map(f => f.main.temp_min);
            const maxTemps = forecasts.map(f => f.main.temp_max);
            const winds = forecasts.map(f => f.wind.speed);
            const pops = forecasts.map(f => f.pop || 0);

            const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
            const minTemp = Math.min(...minTemps);
            const maxTemp = Math.max(...maxTemps);
            const avgWind = winds.reduce((a, b) => a + b, 0) / winds.length;
            const maxPop = Math.max(...pops);

            // Determine dominant condition
            const conditions = forecasts.map(f => f.weather[0]?.main.toLowerCase() || 'unknown');
            const conditionCounts = conditions.reduce((acc, c) => {
                acc[c] = (acc[c] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const dominantCondition = Object.entries(conditionCounts)
                .sort((a, b) => b[1] - a[1])[0][0];

            const conditionMap: Record<string, WeatherSnapshot['condition']> = {
                clear: 'clear',
                clouds: 'cloudy',
                rain: 'rain',
                drizzle: 'rain',
                thunderstorm: 'storm',
                snow: 'snow',
                mist: 'cloudy',
                fog: 'cloudy',
            };

            return {
                avgTempC: Math.round(avgTemp * 10) / 10,
                minTempC: Math.round(minTemp * 10) / 10,
                maxTempC: Math.round(maxTemp * 10) / 10,
                windKph: Math.round(avgWind * 3.6 * 10) / 10, // m/s to km/h
                precipitationChance: maxPop,
                condition: conditionMap[dominantCondition] || 'unknown',
            };
        } catch (error) {
            throw new WeatherError(
                error instanceof Error ? error.message : 'Failed to fetch weather'
            );
        }
    }

    async healthCheck(): Promise<boolean> {
        try {
            // Simple check: try to fetch weather for a known location (London)
            await this.fetchForecast(51.5074, -0.1278, new Date(), new Date(Date.now() + 86400000));
            return true;
        } catch {
            return false;
        }
    }
}
