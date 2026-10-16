/**
 * BAHT: pages the YouTube TV window may show – YouTube itself and the Google sign-in (TV code linking).
 * Kept free of Electron imports so `npm test` can check it with plain Node.
 */
const ALLOWED_HOSTS = /^(?:[a-z0-9-]+\.)*(?:youtube\.com|google\.com|gstatic\.com|googleusercontent\.com)$/;

export function allowedUrl(raw: string): boolean {
    try {
        const u = new URL(raw);
        return u.protocol === 'https:' && ALLOWED_HOSTS.test(u.hostname);
    } catch {
        return false;
    }
}
