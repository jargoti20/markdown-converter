import TurndownService from "turndown"

const turndownService = new TurndownService()

export function convertMarkdownToHtml(markdownContent: string, renderedHtml: string): string {
  // Use the rendered HTML from the prose div which includes syntax highlighting
  return renderedHtml
}

export function convertHtmlToMarkdown(html: string): string {
  return turndownService.turndown(html)
}

