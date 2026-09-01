"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://brandme-api.brandme266.workers.dev";

const categoryLabels = {
  general: "عام",
  marketing: "تسويق رقمي",
  web: "تطوير ويب",
  design: "تصميم",
  tips: "نصائح",
  news: "أخبار",
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts?published=1`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="المدونة | نصائح وأفكار في التسويق الرقمي"
        description="آخر المقالات والأفكار في عالم التسويق الرقمي، تطوير المواقع، التصميم، ونصائح عملية لنجاح تواجدك الرقمي."
        url="https://brandme-api.brandme266.workers.dev/blog"
      />
      <Navbar />
      <main className="pt-24 pb-16 bg-gray-50 min-h-screen" dir="rtl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">المدونة</h1>
            <p className="text-gray-500 text-lg">آخر المقالات والأفكار في عالم التسويق الرقمي</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
            {[
              { id: "all", label: "الكل" },
              { id: "marketing", label: "تسويق رقمي" },
              { id: "web", label: "تطوير ويب" },
              { id: "design", label: "تصميم" },
              { id: "tips", label: "نصائح" },
              { id: "news", label: "أخبار" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#4a9a10] text-white shadow-md shadow-green-100"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/post?slug=${post.slug}`}
                  className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-[#a8d67a] transition-all duration-300 flex flex-col h-full block"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    {post.image_url && (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold text-[#3d8a10] bg-[#f0f8e8] px-3 py-1 rounded-full border border-[#a8d67a]">
                        {categoryLabels[post.category] || post.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[#4a9a10] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-900 font-bold text-sm">
                      <span className="group-hover:text-[#4a9a10] transition-colors">اقرأ المزيد</span>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        {post.views || 0}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">لا يوجد مقالات في هذا التصنيف</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
