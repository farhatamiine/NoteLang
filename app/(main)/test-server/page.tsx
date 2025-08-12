// app/test-server/page.tsx

// We import the server action directly. Since this is a server component,
// this code will not be bundled for the client.
import React from 'react';
import {generateWordExamples} from "@/lib/ai/generateWordExample";

// This function is an async Server Component.
// The data fetching and generation happen on the server before the page is rendered.
export default async function TestGeneratorPage() {
    const input = {
        word: {
            learning: "ماكلة",
            pos: "nom"
        },
        nativeLanguage: "French",
        topic: "food",
        level: "beginner",
        style: "casual",
        includeTransliteration: true,
        maxWords: 15
    };

    let result = null;
    let error = null;

    try {
        // Call the server action. This code runs on the server.
        result = await generateWordExamples(input);

        // Log the result to the terminal where your Next.js server is running.
        console.log("Generated Examples:", JSON.stringify(result, null, 2));
    } catch (err) {
        console.error("Error during generation:", err);
        error = "An error occurred during generation. Check the server logs for details.";
    }

    // The component renders the output based on the result.
    return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', backgroundColor: '#f4f4f4' }}>
            <h1 style={{ color: '#333' }}>Server-Side Generation Test</h1>
            <p style={{ color: '#555' }}>The function `generateWordExamples` was executed on the server. The generated JSON is logged to your terminal and rendered below.</p>

            {error && (
                <pre style={{ backgroundColor: '#fee', border: '1px solid #f99', padding: '1rem', borderRadius: '8px', color: 'red' }}>
          {error}
        </pre>
            )}

            {result && (
                <>
          <pre style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
                </>
            )}
        </div>
    );
}