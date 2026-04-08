// app/page.tsx
import { getSortedLogsData } from "@/lib/logs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const changelogs = getSortedLogsData();

  // Custom style cho các Badge giống Culiops
  const getBadgeStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "feature":
      case "added":
        return "bg-green-50 text-green-600";
      case "fix":
      case "fixed":
        return "bg-red-50 text-red-500";
      case "improved":
      case "changed":
        return "bg-purple-50 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <main className="min-h-screen bg-white py-16 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-[32px] font-bold text-gray-900 mb-2">Nhật ký thay đổi</h1>
          <p className="text-[16px] text-gray-500">
            Tính năng mới, cải tiến và sửa lỗi trên nền tảng.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-gray-100 ml-2">
          
          {changelogs.map((log) => (
            <div key={log.id} className="mb-12 relative pl-8">
              
              {/* Timeline Dot */}
              <div className="absolute w-[14px] h-[14px] bg-white border-[2px] border-gray-200 rounded-full -left-[7.5px] top-[6px]"></div>

              {/* Log Card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] p-6 md:p-8">
                
                {/* Header Card: Title & Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="text-[18px] font-semibold text-gray-900">{log.version}</h2>
                  <div className="flex gap-2">
                    {log.tags.map((tag: string, idx: number) => (
                      <span key={idx} className={`px-2 py-0.5 rounded text-[13px] font-medium ${getBadgeStyle(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Date */}
                <time className="block text-[14px] text-gray-400 mb-5">{log.date}</time>
                
                {/* Summary (if any) */}
                {log.summary && (
                  <p className="text-[15px] text-gray-600 mb-6">{log.summary}</p>
                )}

                {/* Markdown Content (Styled via Tailwind Prose) */}
                <div className="prose max-w-none 
                  prose-headings:text-[16px] prose-headings:font-bold prose-headings:text-gray-800 prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0
                  prose-p:text-[15px] prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-3
                  prose-li:relative prose-li:pl-5 prose-li:text-[15px] prose-li:text-gray-600 prose-li:leading-relaxed
                  marker:content-none
                  [&>ul>li::before]:content-[''] [&>ul>li::before]:absolute [&>ul>li::before]:w-1 [&>ul>li::before]:h-1 [&>ul>li::before]:bg-gray-300 [&>ul>li::before]:rounded-full [&>ul>li::before]:left-1 [&>ul>li::before]:top-[10px]
                ">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {log.content}
                  </ReactMarkdown>
                </div>

              </div>
            </div>
          ))}
          
        </div>
      </div>
    </main>
  );
}