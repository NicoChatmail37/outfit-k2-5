export const Time = {
    hours: (n: number) => n * 60 * 60 * 1000,
    days: (n: number) => n * 24 * 60 * 60 * 1000,
    now: () => Date.now(),
};
