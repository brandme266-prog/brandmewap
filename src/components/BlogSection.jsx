"use client";
import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

const API_BASE = import.meta.env.VITE_API_URL || "https://brandme-api.brandme266.workers.dev";

import { initialPosts } from "@/data/posts";

export default function BlogSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [posts, setPosts] = useState(initialPosts.slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts?published=1`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const apiSlugs = new Set(data.map((p) => p.slug));
          const uniqueInitial = initialPosts.filter((p) => !apiSlugs.has(p.slug));
          setPosts([...data, ...uniqueInitial].slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  if (loading) {
    return (
      <section id="blog" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
            <div className="h-10 bg-gray-200 rounded w-80" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse border border-gray-100">
                <div className="h-52 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-white relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <span className="section-tag mb-4">{t.blog.tag}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              {t.blog.title}
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-lg leading-relaxed">
              {t.blog.desc}
            </p>
          </div>
          <Link
            to="/blog"
            className="text-[#4a9a10] font-bold hover:underline whitespace-nowrap text-lg"
          >
            {t.blog.allPosts}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/post?slug=${post.slug}`}
              className="reveal group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-[#a8d67a] transition-all duration-300 flex flex-col h-full block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-[#2d6a08] bg-[#f0f8e8] px-3 py-1 rounded-full border border-[#a8d67a]">
                    {t.blog.categories[post.category] || post.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[#4a9a10] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-gray-900 font-bold text-sm">
                  <span className="group-hover:text-[#4a9a10] transition-colors">{t.blog.readMore}</span>
                  <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#4a9a10] group-hover:text-white transition-colors border border-gray-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 -scale-x-100">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
