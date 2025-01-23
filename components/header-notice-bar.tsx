'use client';

import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { X } from 'lucide-react';

export default function HeaderNoticeBar() {
    const [isVisible, setIsVisible] = useState(true);

    // Effect to handle class updates for #markdown-preview and #markdown-input
    useEffect(() => {
        const updateClasses = () => {
            const markdownPreview = document.getElementById('markdown-preview');
            const markdownInput = document.getElementById('markdown-input');

            if (markdownPreview && markdownInput) {
                if (isVisible) {
                    // Apply classes for when the notice bar is visible
                    markdownPreview.classList.remove('h-[calc(100vh_-_9.5em)]');
                    markdownPreview.classList.add('h-[calc(100vh_-_12em)]');
                    markdownInput.classList.remove('h-[calc(100vh_-_9.5em)]');
                    markdownInput.classList.add('h-[calc(100vh_-_12em)]');
                } else {
                    // Apply classes for when the notice bar is hidden
                    markdownPreview.classList.remove('h-[calc(100vh_-_12em)]');
                    markdownPreview.classList.add('h-[calc(100vh_-_9.5em)]');
                    markdownInput.classList.remove('h-[calc(100vh_-_12em)]');
                    markdownInput.classList.add('h-[calc(100vh_-_9.5em)]');
                }
            }
        };

        // Update classes initially and whenever `isVisible` changes
        updateClasses();
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="w-full bg-[#ff6700] text-white py-2 px-4">
            <div className="container mx-auto flex items-center justify-center gap-2">
                <p className="text-sm font-normal">
                    This website is a prototype and is not intended to be used on screens smaller than 1024px
                </p>
                <Button
                    variant="ghost"
                    onClick={() => setIsVisible(false)}
                    className="h-6 w-6 p-0 hover:bg-transparent text-neutral-200 hover:text-neutral-50"
                    aria-label="Close notice"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}