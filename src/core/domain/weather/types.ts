export interface WeatherSnapshot {
    avgTempC: number;
    minTempC: number;
    maxTempC: number;
    windKph: number;
    precipitationChance: number;
    condition: 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'unknown';
}
