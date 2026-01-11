import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main className="max-w-6xl mx-auto py-16 px-6 font-serif">
      <header className="text-center mb-16">
        <h1 className="text-6xl tracking-tighter mb-6">THE BLOG</h1>
        <p className="text-gray-400 uppercase tracking-[0.4em] text-xs font-sans">Thoughts, ideas and memories.</p>
      </header>

      <div className="w-full aspect-[21/9] mb-24 overflow-hidden bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" 
          alt="Main Visual"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* 2列をより強力に指定 (grid-cols-2 を確実に効かせる) */}
      <div className="flex flex-wrap -mx-6"> 
        {posts.map((post: any) => (
          <div key={post.id} className="w-full md:w-1/2 px-6 mb-20">
            <Link href={`/posts/${post.id}`} className="group block">
              <Card className="border-none shadow-none bg-transparent">
                <div className="aspect-[16/10] w-full overflow-hidden mb-8 bg-gray-100">
                  <img 
                    src={post.image || "https://via.placeholder.com/800x500"} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-80" 
                  />
                </div>

                <CardHeader className="p-0">
                  <div className="flex gap-4 items-center mb-4 font-sans">
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">{post.date}</p>
                     <span className="w-8 h-[1px] bg-gray-200"></span>
                  </div>
                  <CardTitle className="text-3xl font-medium leading-tight group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-6 font-sans">
                  <p className="text-gray-500 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-8 text-[10px] font-bold uppercase tracking-widest border-b border-black inline-block pb-1 group-hover:border-gray-400 group-hover:text-gray-400 transition-all">
                    Read More
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}