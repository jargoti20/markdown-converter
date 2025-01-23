'use client';

import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { X } from 'lucide-react';

export default function HeaderNoticeBar() {
    // Explicitly define the state type as `boolean | null`
    const [isVisible, setIsVisible] = useState<boolean | null>(null);

    // Load the visibility state from localStorage on component mount
    useEffect(() => {
        const storedVisibility = localStorage.getItem('noticeBarVisible');
        if (storedVisibility === 'false') {
            setIsVisible(false); // Hide the notice bar if the user previously closed it
        } else {
            setIsVisible(true); // Show the notice bar by default
        }
    }, []);

    // Update classes for #markdown-preview and #markdown-input when visibility changes
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

        if (isVisible !== null) {
            // Only update classes if the visibility state is loaded
            updateClasses();

            // Save the visibility state to localStorage
            localStorage.setItem('noticeBarVisible', isVisible.toString());
        }
    }, [isVisible]);

    // Prevent rendering until the visibility state is loaded
    if (isVisible === null) return null;

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