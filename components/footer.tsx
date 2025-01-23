import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-neutral-600 dark:bg-neutral-800 text-white py-4 px-4 z-50">
            <div className="container mx-auto">
                <p className="text-sm font-medium text-center text-mono">
                    a project by{' '}
                    <a 
                        href="https://jargoti.com" 
                        className="hover:text-emerald-200 transition-colors duration-200 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        jargoti
                    </a>
                    . © {currentYear}. all rights reserved
                </p>
            </div>
        </footer>
    )
}