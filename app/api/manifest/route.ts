import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(_request: Request) {
    try {
        // Read the manifest file from the public directory
        const manifestPath = path.join(process.cwd(), 'public', 'manifest.webmanifest.json');
        const manifestContent = await fs.readFile(manifestPath, 'utf-8');

        // Return the manifest with proper headers
        return new NextResponse(manifestContent, {
            headers: {
                'Content-Type': 'application/manifest+json',
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Next-Locale': 'en',
            },
        });
    } catch (error) {
        console.error('Error reading manifest:', error);
        return new NextResponse('Manifest not found', { status: 404 });
    }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'X-Next-Locale': 'en',
        },
    });
}