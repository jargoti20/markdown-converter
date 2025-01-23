import NotionMarkdownConverter from "./components/NotionMarkdownConverter"
import HeaderNoticeBar from "@/components/header-notice-bar"

export default function Home() {
  return (
    <main className="h-[calc(100vh-52px)]">
      <HeaderNoticeBar />
      <NotionMarkdownConverter />
    </main>
  )
}

