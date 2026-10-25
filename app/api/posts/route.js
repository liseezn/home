const WORDPRESS_API = "https://blog.liseezn.top/wp-json/wp/v2/posts?per_page=12&_embed";
function stripHtml(value = "") { return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(); }
export async function GET() {
  try {
    const response = await fetch(WORDPRESS_API, { headers: { Accept: "application/json" }, next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return Response.json({ posts: [], error: "博客暂时不可用" }, { status: 502 });
    const data = await response.json();
    const posts = Array.isArray(data) ? data.map((post) => ({ id: post.id, title: stripHtml(post?.title?.rendered || ""), excerpt: stripHtml(post?.excerpt?.rendered || ""), date: post.date || null, link: typeof post.link === "string" ? post.link : "https://blog.liseezn.top" })) : [];
    return Response.json({ posts }, { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" } });
  } catch { return Response.json({ posts: [], error: "暂时无法连接博客" }, { status: 502 }); }
}
