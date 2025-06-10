type Division = {
    amount: number;
    unit: Intl.RelativeTimeFormatUnit;
};

const DIVISIONS: Division[] = [
    { amount: 60, unit: "seconds" },
    { amount: 60, unit: "minutes" },
    { amount: 24, unit: "hours" },
    { amount: 7, unit: "days" },
    { amount: 4.34524, unit: "weeks" },
    { amount: 12, unit: "months" },
    { amount: Number.POSITIVE_INFINITY, unit: "years" },
];

export function formatTimeAgo(timestamp: number) {
    let durationSecs = (timestamp - Date.now()) / 1000;

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(durationSecs) < division.amount) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
            return rtf.format(Math.round(durationSecs), division.unit);
        }
        durationSecs /= division.amount;
    }
}
