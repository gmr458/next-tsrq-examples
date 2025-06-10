export function formatDateTime(timestamp: number): string {
    const datetime = new Date(timestamp);
    return new Intl.DateTimeFormat("en-ES", {
        dateStyle: "short",
        timeStyle: "medium",
    }).format(datetime);
}
