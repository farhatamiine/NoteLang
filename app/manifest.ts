import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Note Lang',
        short_name: 'Notelang',
        "description": "A Progressive Web App to learn languages using bilingual notes, examples, tags, and audio pronunciation.",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#0f172a",
        "icons": [
            {
                "src": "/web-app-manifest-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/web-app-manifest-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        "lang": "en",
        "orientation": "portrait",
        "categories": ["education", "language", "productivity"],
        "id": "/?source=pwa"
    }
}