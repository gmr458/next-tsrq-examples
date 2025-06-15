/**
 * Formats a date into a relative time string (e.g., "2 hours ago", "in 3 days").
 *
 * @param date The date to format. Can be a Date object, a date string, or a timestamp number.
 * @param locale A string with a BCP 47 language tag (e.g., 'en-US', 'es', 'fr'). Defaults to 'en-US'.
 * @param options An object to customize the formatting, corresponding to Intl.RelativeTimeFormatOptions.
 * @returns A formatted relative time string.
 */
export function formatRelativeTime(
    date: Date | string | number,
    locale: string = "en-US",
    options: Intl.RelativeTimeFormatOptions = { numeric: "auto" },
): string {
    const rtf = new Intl.RelativeTimeFormat(locale, options);
    const targetDate = new Date(date);
    const now = new Date();

    const diffInSeconds = (targetDate.getTime() - now.getTime()) / 1000;

    // Define time units in seconds, from largest to smallest
    const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
        { unit: "year", seconds: 31536000 },
        { unit: "month", seconds: 2592000 },
        { unit: "week", seconds: 604800 },
        { unit: "day", seconds: 86400 },
        { unit: "hour", seconds: 3600 },
        { unit: "minute", seconds: 60 },
        { unit: "second", seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
        if (Math.abs(diffInSeconds) >= seconds) {
            const value = Math.round(diffInSeconds / seconds);
            return rtf.format(value, unit);
        }
    }

    // Fallback for differences less than 1 second
    return rtf.format(0, "second");
}
