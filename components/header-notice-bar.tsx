'use client'
import { useState } from 'react'
import { Button } from "./ui/button"
import { X } from 'lucide-react'

export default function HeaderNoticeBar() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

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
    )
}