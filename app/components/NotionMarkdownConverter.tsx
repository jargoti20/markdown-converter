"use client"

import React, { useState, useCallback, useRef, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { ToggleSwitch } from "./ToggleSwitch"
import { NotionStyles } from "../styles/NotionStyles"
import { convertMarkdownToHtml, convertHtmlToMarkdown } from "../lib/converterLogic"

export default function NotionMarkdownConverter() {
  const [isMarkdownMode, setIsMarkdownMode] = useState(true)
  const [markdown, setMarkdown] = useState(
    '# Welcome to Notion-like Converter\n\nStart typing your markdown here...\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```',
  )
  const [html, setHtml] = useState("<h1>Welcome to Notion-like Converter</h1>\n\n<p>Start typing your HTML here...</p>")
  const [outputCode, setOutputCode] = useState("")
  const [previewMarkdown, setPreviewMarkdown] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const proseRef = useRef<HTMLDivElement>(null)

  // Update preview markdown whenever HTML changes
  useEffect(() => {
    if (!isMarkdownMode) {
      try {
        const converted = convertHtmlToMarkdown(html)
        setPreviewMarkdown(converted)
      } catch (error) {
        console.error('Error converting HTML to Markdown:', error)
        setPreviewMarkdown('Error converting HTML to Markdown')
      }
    }
  }, [html, isMarkdownMode])

  const generateOutput = useCallback(() => {
    if (isMarkdownMode && proseRef.current) {
      // Clone the prose div to modify it without affecting the display
      const proseClone = proseRef.current.cloneNode(true) as HTMLElement

      // Get all syntax highlighted code blocks
      const codeBlocks = proseClone.querySelectorAll("pre")
      codeBlocks.forEach((pre) => {
        // Replace syntax highlighted div with simple pre > code structure
        const code = pre.querySelector("code")
        if (code) {
          const newPre = document.createElement("pre")
          const newCode = document.createElement("code")
          const language = code.className?.match(/language-(\w+)/)?.[1] || ""
          if (language) {
            newCode.className = `language-${language}`
          }
          newCode.textContent = code.textContent || ""
          newPre.appendChild(newCode)
          pre.replaceWith(newPre)
        }
      })

      setOutputCode(proseClone.innerHTML)
    } else {
      try {
        const markdown = convertHtmlToMarkdown(html)
        setOutputCode(markdown)
      } catch (error) {
        console.error('Error converting HTML to Markdown:', error)
        toast.error('Failed to convert HTML to Markdown. Please check your HTML input.')
      }
    }
    setIsDialogOpen(true)
  }, [isMarkdownMode, html])

  const copyOutput = useCallback(() => {
    navigator.clipboard
      .writeText(outputCode)
      .then(() => {
        toast.success(`${isMarkdownMode ? "HTML" : "Markdown"} copied to clipboard!`)
      })
      .catch((err) => {
        toast.error("Failed to copy: " + err.message)
      })
  }, [outputCode, isMarkdownMode])

  const toggleMode = () => {
    setIsMarkdownMode((prev) => !prev)
  }

  return (
    <>
      <NotionStyles />
      <div className="h-[calc(100vh)] bg-gray-100 p-4">
        <div className="sticky top-0 w-full bg-white-500 dark:bg-neutral-900 flex justify-center z-50">
          <ToggleSwitch isMarkdownMode={isMarkdownMode} onToggle={toggleMode} />
        </div>
        <div className="w-full mx-auto px-4">

          <div className="mb-4 h-full flex justify-center">

          </div>
          <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 overflow-hidden">
              {isMarkdownMode ? (
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full h-full resize-none border-none focus:ring-0 bg-transparent overflow-auto"
                  placeholder="Type your markdown here..."
                />
              ) : (
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-full resize-none border-none focus:ring-0 bg-transparent overflow-auto font-mono"
                  placeholder="Type your HTML here..."
                />
              )}
            </div>
            <div className="p-4 overflow-auto h-full prose max-w-none relative">
              <div ref={proseRef} className="prose max-w-none h-full pb-16">
                {isMarkdownMode ? (
                  <ReactMarkdown
                    components={{
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "")
                        const inline = !match
                        return !inline ? (
                          <SyntaxHighlighter
                            {...(props as any)}
                            PreTag="div"
                            language={match[1]}
                            children={String(children).replace(/\n$/, "")}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                ) : (
                  <div className="prose max-w-none">
                    <ReactMarkdown>
                      {previewMarkdown}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <Button className="absolute top-4 right-4 z-10" onClick={() => {
                generateOutput()
                toggleMode()
              }}>
                Show {isMarkdownMode ? "HTML" : "Markdown"} and Switch Mode
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  {/* <Button onClick={generateOutput}>Show {isMarkdownMode ? "HTML" : "Markdown"}</Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Generated {isMarkdownMode ? "HTML" : "Markdown"}</DialogTitle>
                    <DialogDescription>
                      This is the {isMarkdownMode ? "HTML" : "Markdown"} output generated from your input. You can copy
                      it to your clipboard.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Textarea value={outputCode} readOnly className="w-full h-64 resize-none font-mono" />
                  </div>
                  <Button onClick={copyOutput} className="mt-4">
                    Copy {isMarkdownMode ? "HTML" : "Markdown"}
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
