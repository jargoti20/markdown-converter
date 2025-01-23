import "./globals.css"
import "./monokai.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/theme-switcher"
import  Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Markdown & HTML Converter",
  description: "Convert between Markdown and HTML.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute right-4 top-[60px] flex items-center gap-8">
            <ThemeSwitcher />
          </div>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
