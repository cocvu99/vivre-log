// app/page.tsx
import { getSortedLogsData } from "@/lib/logs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const changelogs = getSortedLogsData();

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "learned": return "bg-green-100 text-green-800";
      case "done": return "bg-blue-100 text-blue-800";
      case "fixed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Engineering Log</h1>
          <p className="text-lg text-gray-500">
            Tracking daily progress, learnings, and quick-wins.
          </p>
        </div>

        <div className="relative border-l border-gray-200 ml-3 md:ml-4">
          {changelogs.map((log) => (
            <div key={log.id} className="mb-12 relative pl-8 md:pl-12">
              <div className="absolute w-4 h-4 bg-white border-2 border-gray-300 rounded-full -left-[9px] top-1.5"></div>

              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8">
                
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900">{log.version}</h2>
                  {log.tags.map((tag: string, idx: number) => (
                    <span key={idx} className={`px-2.5 py-0.5 rounded-md text-sm font-medium ${getTagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                <time className="block text-sm text-gray-400 mb-4">{log.date}</time>
                <p className="text-gray-600 mb-6 font-medium">{log.summary}</p>

                <div className="prose prose-sm md:prose-base max-w-none text-gray-600 prose-headings:text-sm prose-headings:font-bold prose-headings:text-gray-900 prose-headings:uppercase prose-headings:tracking-wider prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0 prose-ul:list-disc prose-ul:marker:text-gray-300 prose-li:pl-1">
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