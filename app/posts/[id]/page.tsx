import { getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postData = await getPostData(id);

  if (!postData) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-8 px-6 font-serif text-black">
      <Link href="/" className="text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-4 block font-sans">
        ← Back to Blog
      </Link>

      <article>
        <header className="mb-0 text-left">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mb-1 font-sans">
            {postData.date}
          </p>
          {/* h1を表示：hiddenを解除し、マージンを最小に */}
          <h1 className="text-2xl font-bold leading-tight mb-2 tracking-tight text-black block">
            {postData.title}
          </h1>
          
          <div className="w-full aspect-[21/9] overflow-hidden bg-gray-100 mt-2 mb-6">
            <img 
              src={postData.image || "https://via.placeholder.com/1200x675"} 
              alt={postData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div 
          className="
            prose prose-neutral max-w-none font-sans leading-relaxed text-gray-800 whitespace-pre-wrap
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-black prose-headings:text-left
            
            /* 見出し2: シンプル。上下の余白を最小限に */
            prose-h2:text-lg prose-h2:mt-4 prose-h2:mb-1 prose-h2:border-none prose-h2:pl-0
            
            /* 見出し3: 左線装飾あり。上下の余白を最小限に */
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-1 prose-h3:pl-4 prose-h3:border-l-2 prose-h3:border-black prose-h3:leading-none
            
            /* 段落：上下の余白をさらに詰め、行間を調整 */
            prose-p:text-base prose-p:mt-0 prose-p:mb-2 prose-p:leading-7
            
            /* リスト部分：1行ずつの余白を詰め、中を詰める */
            prose-ul:mt-0 prose-ul:mb-4 prose-li:mt-0 prose-li:mb-0
            prose-ol:mt-0 prose-ol:mb-4
            
            /* インラインコード：#191970（ミッドナイトブルー） */
            prose-code:text-[#191970] prose-code:bg-transparent prose-code:before:content-none prose-code:after:content-none prose-code:font-medium
            
            /* コードブロック */
            prose-pre:bg-zinc-900 prose-pre:rounded-lg prose-pre:mt-2 prose-pre:mb-6
          "
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>

      <footer className="mt-12 pt-6 border-t border-gray-100 text-center">
        <Link href="/" className="text-xs font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all font-sans uppercase tracking-widest">
          View All Posts
        </Link>
      </footer>
    </main>
  );
}