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
import { convertHtmlToMarkdown } from "../lib/converterLogic"
import { useTheme } from "next-themes"
import { Copy } from "lucide-react"

export default function NotionMarkdownConverter() {
  const [isMarkdownMode, setIsMarkdownMode] = useState(true)
  const [markdown, setMarkdown] = useState(
    '# Welcome to Markdown Converter\n\nStart typing your markdown here...\n\n```javascript\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```',
  )
  const [html, setHtml] = useState("<h1>Welcome to Markdown Converter</h1>\n\n<p>Start typing your HTML here...</p>")
  const [outputCode, setOutputCode] = useState("")
  const [previewMarkdown, setPreviewMarkdown] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const proseRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

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
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Markdown / HTML Converter</h1>
        <div className="flex items-center gap-8 mr-16">
          <div className="h-full items-center flex">
            <ToggleSwitch isMarkdownMode={isMarkdownMode} onToggle={() => setIsMarkdownMode(!isMarkdownMode)} />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={generateOutput} className='w-120 text-center block'>
                Show {isMarkdownMode ? "HTML" : "Markdown"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full overflow-x-scroll">
              <DialogHeader>
                <DialogTitle>Generated {isMarkdownMode ? "HTML" : "Markdown"}</DialogTitle>
                <DialogDescription>
                  Copy the generated code below:
                </DialogDescription>
                <Button
                  className="absolute right-12 top-4 flex items-center"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(outputCode)
                    toast.success("Copied to clipboard!")
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </DialogHeader>
              <div className="relative">
                <pre className="max-h-[60vh] overflow-x-scroll rounded-lg border bg-muted p-4">
                  <code>{outputCode}</code>
                </pre>

              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div id="markdown-input" className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-background p-4 h-[calc(100vh-12rem)]">
            {isMarkdownMode ? (
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="h-full min-h-[500px] resize-none bg-transparent"
                placeholder="Enter your Markdown here..."
              />
            ) : (
              <Textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="h-full min-h-[500px] resize-none bg-transparent"
                placeholder="Enter your HTML here..."
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div
            ref={proseRef}
            id="markdown-preview"
            className="prose prose-sm dark:prose-invert h-[calc(100vh-12.0rem)] max-w-none overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-background p-4"
          >
            {isMarkdownMode ? (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={undefined}
                        language={match[1]}
                        PreTag="div"
                        className="my-0! bg-muted!"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            ) : (
              <div className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{previewMarkdown}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
