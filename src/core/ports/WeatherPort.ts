import { WeatherSnapshot } from '../domain/weather/types';

export interface WeatherPort {
    fetchForecast(lat: number, lon: number, dateStart: Date, dateEnd: Date): Promise<WeatherSnapshot>;
    healthCheck(): Promise<boolean>;
}
