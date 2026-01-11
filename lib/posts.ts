import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
// HTMLを処理するために追加
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // メタデータ部分を解析
  const matterResult = matter(fileContents);

  // MarkdownをHTMLに変換（HTMLタグの実行を許可）
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true }) // Markdown内のHTMLを解析
    .use(rehypeStringify, { allowDangerousHtml: true }) // HTMLとして出力
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; image: string }),
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; excerpt: string; image: string }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}