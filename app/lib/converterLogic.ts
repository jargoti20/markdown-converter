import TurndownService from "turndown"
import type { Node, Options } from "turndown"

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
})

// Add support for code blocks with language
turndownService.addRule('fencedCodeBlock', {
  filter: (node: Node, options: Options) => {
    if (!(node instanceof HTMLElement)) return false
    return (
      node.nodeName === 'PRE' &&
      node.firstChild instanceof HTMLElement &&
      node.firstChild.nodeName === 'CODE'
    )
  },
  replacement: (content: string, node: Node, options: Options) => {
    if (!(node instanceof HTMLElement) || !(node.firstChild instanceof HTMLElement)) {
      return content
    }
    const code = node.firstChild
    const className = code.getAttribute('class') || ''
    const language = className.match(/language-(\w+)/)?.[1] || ''
    return (
      '\n\n```' + language + '\n' +
      code.textContent +
      '\n```\n\n'
    )
  }
})

export function convertMarkdownToHtml(markdownContent: string, renderedHtml: string): string {
  return renderedHtml
}

export function convertHtmlToMarkdown(html: string): string {
  try {
    // Clean up HTML input
    const cleanHtml = html
      .replace(/\n\s*\n/g, '\n\n') // Normalize multiple newlines
      .replace(/<br\s*\/?>/gi, '\n') // Convert <br> to newlines
      .trim()

    if (!cleanHtml) {
      return ''
    }

    // Create a temporary div to parse HTML
    const div = document.createElement('div')
    div.innerHTML = cleanHtml

    // Convert to markdown
    const markdown = turndownService.turndown(div)
    return markdown.trim()
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error)
    throw new Error('Failed to convert HTML to Markdown')
  }
}
