import "./globals.css"
import "./monokai.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Markdown & HTML Converter",
  description: "Convert between Markdown and HTML with a Notion-like interface",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}

