import { WeatherPort } from '../../core/ports/WeatherPort';
import { WeatherSnapshot } from '../../core/domain/weather/types';
import { WeatherError } from '../../shared/errors';

export class OpenMeteoAdapter implements WeatherPort {
    private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

    async fetchForecast(
        lat: number,
        lon: number,
        dateStart: Date,
        dateEnd: Date
    ): Promise<WeatherSnapshot> {
        try {
            // Fetch current weather + forecast
            // We request: temperature, apparent_temperature, precipitation_probability, rain, showers, snowfall, wind_speed_10m, weather_code
            const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            /*
             Open-Meteo WMO Weather Codes:
             0: Clear sky
             1, 2, 3: Mainly clear, partly cloudy, and overcast
             45, 48: Fog
             51, 53, 55: Drizzle
             56, 57: Freezing Drizzle
             61, 63, 65: Rain
             66, 67: Freezing Rain
             71, 73, 75: Snow fall
             77: Snow grains
             80, 81, 82: Rain showers
             85, 86: Snow showers
             95, 96, 99: Thunderstorm
            */

            const code = data.current.weather_code;
            let condition: WeatherSnapshot['condition'] = 'unknown';

            if (code === 0) condition = 'clear';
            else if (code <= 3) condition = 'cloudy';
            else if (code <= 48) condition = 'cloudy'; // Fog is "cloudy" equivalent for outfit
            else if (code <= 67) condition = 'rain';
            else if (code <= 77) condition = 'snow';
            else if (code <= 82) condition = 'rain';
            else if (code <= 86) condition = 'snow';
            else if (code <= 99) condition = 'storm';

            // Use current data for immediate recommendation
            // Use daily max precip probability as the "chance"
            const precipChance = data.daily.precipitation_probability_max?.[0] ? data.daily.precipitation_probability_max[0] / 100 : 0;

            return {
                avgTempC: data.current.temperature_2m, // Current temp
                minTempC: data.daily.temperature_2m_min[0],
                maxTempC: data.daily.temperature_2m_max[0],
                windKph: data.current.wind_speed_10m,
                precipitationChance: precipChance,
                condition: condition,
            };
        } catch (error) {
            throw new WeatherError(
                error instanceof Error ? error.message : 'Failed to fetch weather from Open-Meteo'
            );
        }
    }

    async healthCheck(): Promise<boolean> {
        try {
            // Check Geneva coordinates
            await this.fetchForecast(46.2044, 6.1432, new Date(), new Date());
            return true;
        } catch {
            return false;
        }
    }
}
