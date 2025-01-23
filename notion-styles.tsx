import { createGlobalStyle } from 'styled-components'

export const NotionStyles = createGlobalStyle`
  .prose {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    padding-top: 2.5rem; /* Add space for the button */
  }

  .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  .prose h1 {
    font-size: 2.25em;
  }

  .prose h2 {
    font-size: 1.875em;
  }

  .prose h3 {
    font-size: 1.5em;
  }

  .prose p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }

  .prose ul, .prose ol {
    padding-left: 1.5em;
  }

  .prose li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }

  .prose a {
    color: #0366d6;
    text-decoration: none;
  }

  .prose a:hover {
    text-decoration: underline;
  }

  .prose code {
    background-color: rgba(27,31,35,0.05);
    border-radius: 3px;
    font-size: 85%;
    padding: 0.2em 0.4em;
  }

  .prose pre {
@apply bg-muted;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
  }
`

