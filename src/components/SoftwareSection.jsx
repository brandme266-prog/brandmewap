"use client";
import { useEffect, useRef, useState } from "react";


import { portfolio } from "../data/portfolio.js";

const initialProjects = portfolio.map((p) => ({
  id: p.id,
  type: p.cat === "تطبيقات جوال" ? "app" : "web",
  title: p.title,
  tech: p.tech || [],
  desc: p.description,
  img: p.img,
  link: p.link,
}));

export default function SoftwareSection() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [softwareProjects, setSoftwareProjects] = useState(initialProjects);

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
  }, [softwareProjects]);

  const filtered = activeFilter === "all" ? softwareProjects : softwareProjects.filter(p => (p.type || p.category) === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-gray-50 border-b border-gray-100 relative overflow-hidden" ref={sectionRef}>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <span className="section-tag mb-4">أعمالنا</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              أعمال تتحدث عن نفسها
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-lg leading-relaxed">
              استعرض أحدث المواقع والتطبيقات التي قمنا بتطويرها بأحدث التقنيات البرمجية لتلبية احتياجات السوق الرقمي.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "all", label: "الكل" },
              { id: "web", label: "مواقع إلكترونية" },
              { id: "app", label: "تطبيقات جوال" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeFilter === f.id
                    ? "bg-[#4a9a10] text-white shadow-md shadow-green-100"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:border-[#a8d67a] transition-all duration-300 flex flex-col h-full cursor-pointer block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100 p-4 pb-0 flex justify-center items-end">
                <div className="relative w-full h-full rounded-t-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500 shadow-sm border border-gray-200/50">
                  <img
                    src={project.img || project.image_url}
                    alt={project.title}
                    
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {(project.tech || []).map((t, i) => (
                    <span key={i} className="text-xs font-bold text-[#2d6a08] bg-[#f0f8e8] px-3 py-1 rounded-full border border-[#a8d67a]">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#4a9a10] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {project.desc || project.description}
                </p>
                <div className="flex items-center justify-between w-full text-gray-900 font-bold text-sm group/btn">
                  <span className="group-hover:text-[#4a9a10] transition-colors">زيارة المشروع</span>
                  <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-[#4a9a10] group-hover/btn:text-white transition-colors border border-gray-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 -scale-x-100">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
