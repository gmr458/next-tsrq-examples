export async function fetchWrapper<T>(
    input: string | URL | globalThis.Request,
    init?: RequestInit,
): Promise<T> {
    const response = await fetch(input, init);

    if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
    }

    return response.json();
}
