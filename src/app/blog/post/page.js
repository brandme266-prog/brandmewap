"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

function BlogPostContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/posts?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.title) {
          setPost(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 bg-gray-50 min-h-screen" dir="rtl">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-80 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 bg-gray-50 min-h-screen" dir="rtl">
          <div className="max-w-4xl mx-auto px-6 text-center py-16">
            <h1 className="text-3xl font-black text-gray-900 mb-4">المقال غير موجود</h1>
            <Link href="/blog" className="text-[#4a9a10] font-bold hover:underline">
              العودة للمدونة
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || post.title}
        image={post.image_url}
        url={`https://brandme-api.brandme266.workers.dev/blog/post?slug=${slug}`}
        type="article"
      />
      <Navbar />
      <main className="pt-24 pb-16 bg-gray-50 min-h-screen" dir="rtl">
        <article className="max-w-4xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#4a9a10] font-bold mb-6 hover:underline">
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            العودة للمدونة
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-bold text-[#3d8a10] bg-[#f0f8e8] px-4 py-1.5 rounded-full border border-[#a8d67a]">
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.image_url && (
            <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
            <div
              className="prose prose-lg prose-arabic max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content
                  ? post.content
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/\n/g, "<br/>")
                      .replace(/^/, "<p>")
                      .replace(/$/, "</p>")
                  : "<p>لا يوجد محتوى</p>",
              }}
            />
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 p-6 bg-[#f0f8e8] rounded-2xl border border-[#a8d67a]">
            <div className="w-12 h-12 rounded-full bg-[#4a9a10] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-lg">B</span>
            </div>
            <div>
              <p className="font-black text-gray-900">BrandMe Agency</p>
              <p className="text-sm text-gray-500">وكالة رقمية متكاملة متخصصة في التسويق الرقمي والبرمجة</p>
            </div>
          </div>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt || "",
            image: post.image_url,
            author: {
              "@type": "Organization",
              name: "BrandMe Agency",
              url: "https://brandme-api.brandme266.workers.dev",
            },
            publisher: {
              "@type": "Organization",
              name: "BrandMe Agency",
              logo: {
                "@type": "ImageObject",
                url: "https://brandme-api.brandme266.workers.dev/images/logo/logo.webp",
              },
            },
            datePublished: post.created_at,
            dateModified: post.updated_at,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://brandme-api.brandme266.workers.dev/blog/post?slug=${slug}`,
            },
          }),
        }}
      />
      <Footer />
    </>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <main className="pt-24 pb-16 bg-gray-50 min-h-screen" dir="rtl">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-80 bg-gray-200 rounded-2xl mb-8"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <BlogPostContent />
    </Suspense>
  );
}
