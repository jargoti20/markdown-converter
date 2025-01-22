'use client'

import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NotionStyles } from './notion-styles'

export default function NotionMarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Welcome to Notion-like Markdown Converter\n\nStart typing your markdown here...')
  const [htmlCode, setHtmlCode] = useState('')

  const generateHtml = () => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = document.querySelector('.prose').innerHTML
    setHtmlCode(tempDiv.innerHTML)
  }

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlCode)
      .then(() => alert('HTML copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <>
      <NotionStyles />
      <div className="h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-full resize-none border-none focus:ring-0 bg-transparent"
              placeholder="Type your markdown here..."
            />
          </div>
          <div className="p-4 overflow-auto prose max-w-none relative">
            <ReactMarkdown>{markdown}</ReactMarkdown>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="absolute top-4 right-4"
                  onClick={generateHtml}
                >
                  Show HTML
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Generated HTML</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Textarea
                    value={htmlCode}
                    readOnly
                    className="w-full h-64 resize-none"
                  />
                </div>
                <Button onClick={copyHtml} className="mt-4">
                  Copy HTML
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}

