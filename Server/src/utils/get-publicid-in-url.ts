export function getPublicIdFromUrl(url: string): string | null {
    try {
        const parts = url.split('/');

        const versionIndex = parts.findIndex(
            (p) => p.startsWith('v') && /^\d+$/.test(p.slice(1)),
        );
        if (versionIndex === -1) return null;

        const publicPath = parts.slice(versionIndex + 1).join('/');

        const dotIndex = publicPath.lastIndexOf('.');
        return dotIndex !== -1 ? publicPath.substring(0, dotIndex) : publicPath;
    } catch {
        return null;
    }
}
