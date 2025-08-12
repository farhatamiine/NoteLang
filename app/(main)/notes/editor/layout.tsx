import React from 'react';

interface EditorLayoutProps {
    children: React.ReactNode;
}


function EditorLayout({children}: EditorLayoutProps) {
    return (
        <div>{children}</div>
    );
}

export default EditorLayout;