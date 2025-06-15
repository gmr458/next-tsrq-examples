/**
 * Formats a date into a locale-sensitive date and time string.
 *
 * @param date The date to format. Can be a Date object, a date string, or a timestamp number.
 * @param locale A string with a BCP 47 language tag (e.g., 'en-US', 'de-DE'). Defaults to 'en-US'.
 * @param options An object to customize the formatting, corresponding to Intl.DateTimeFormatOptions.
 *                Defaults to a medium date and short time.
 * @returns A formatted date and time string.
 */
export function formatDateTime(
    date: Date | string | number,
    locale: string = "en-US",
    options: Intl.DateTimeFormatOptions = {
        dateStyle: "medium",
        timeStyle: "short",
    },
): string {
    const dtf = new Intl.DateTimeFormat(locale, options);
    return dtf.format(new Date(date));
}
