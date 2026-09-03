"use client";
import { useState, useRef, useEffect } from "react";


const categories = ["الكل", "تصميم مواقع", "هوية بصرية", "تطبيقات جوال"];
const portfolio = [
  { 
    id: 1, title: "منصة ذاكرلي التعليمية", cat: "تصميم مواقع", img: "/images/httpszakrly.online.webp", client: "Zakrly", link: "https://zakrly.online",
    stats: { label: "تفاعل الطلاب", val: "+150%" },
    description: "منصة تعليمية متكاملة تهدف إلى تسهيل عملية التعلم عن بعد وتوفير بيئة تفاعلية بين المعلم والطالب. تحتوي المنصة على نظام فصول افتراضية، اختبارات إلكترونية، وتتبع لأداء الطلاب.",
    tech: ["React", "Node.js", "MongoDB"]
  },
  { 
    id: 2, title: "تطبيق csmalink", cat: "تطبيقات جوال", img: "/images/httpsplay.google.comstoreappsdetailsid=com.pharmacysmarts.app.webp", client: "csmalink", link: "https://smartpharmacy.app",
    stats: { label: "تحميل التطبيق", val: "+10K" },
    description: "تطبيق متكامل لطلب الأدوية ومستحضرات التجميل من صيدليات csmalink. يوفر التطبيق تجربة مستخدم سلسة لتصفح المنتجات، رفع الوصفات الطبية، وتتبع حالة الطلب حتى التوصيل.",
    tech: ["Flutter", "Firebase", "Node.js"]
  },
  { 
    id: 3, title: "تطبيق أوردارت (Ordart)", cat: "تطبيقات جوال", img: "/images/httpsplay.google.comstoreappsdetailsid=com.ordart.app.webp", client: "Ordart", link: "https://play.google.com/store/apps/details?id=com.ordart.app",
    stats: { label: "طلبات نشطة", val: "+500 يومياً" },
    description: "تطبيق مميز لتوصيل الطلبات وتسهيل عمليات الشراء من المتاجر المحلية. يحتوي التطبيق على نظام خرائط متقدم لتتبع المندوبين ولوحة تحكم متكاملة لإدارة العمليات.",
    tech: ["React Native", "Google Maps API", "Laravel"]
  },
  { 
    id: 4, title: "موقع وكالة إشراق", cat: "تصميم مواقع", img: "/images/httpsishraq-adv.com.webp", client: "Ishraq Adv", link: "https://ishraq-adv.com",
    stats: { label: "زيادة الزيارات", val: "+200%" },
    description: "موقع تعريفي متكامل لوكالة إشراق للدعاية والإعلان، يعرض خدمات الوكالة وسابقة أعمالها بشكل عصري وجذاب يعكس هوية الشركة الإبداعية.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"]
  },
  { 
    id: 5, title: "متجر جنة الإلكتروني", cat: "تصميم مواقع", img: "/images/httpsganna1.com.webp", client: "Ganna1", link: "https://ganna1.com",
    stats: { label: "معدل التحويل", val: "5.2%" },
    description: "متجر إلكتروني متقدم لبيع المنتجات المتنوعة، يوفر تجربة تسوق سهلة وسريعة مع بوابات دفع آمنة ونظام متكامل لإدارة المخزون والطلبات.",
    tech: ["Shopify", "React", "Stripe"]
  },
  { 
    id: 6, title: "موقع نجد سداد", cat: "تصميم مواقع", img: "/images/httpsnajdsadad.com.png", client: "نجد سداد", link: "https://najdsadad.com",
    stats: { label: "سرعة الأداء", val: "99%" },
    description: "موقع إلكتروني لشركة نجد سداد لتقديم خدمات الدفع والتقسيط. يتميز الموقع بتصميم احترافي يركز على تجربة المستخدم وسهولة الوصول للخدمات المالية.",
    tech: ["Vue.js", "Nuxt.js", "Tailwind CSS"]
  },
  { 
    id: 7, title: "متجر أحمد الماسي", cat: "تصميم مواقع", img: "/images/httpsahmedalmasi.com.jpeg", client: "أحمد الماسي", link: "https://ahmedalmasi.com",
    stats: { label: "زيادة المبيعات", val: "+150%" },
    description: "متجر إلكتروني فاخر متخصص في بيع الساعات والمجوهرات، يوفر تجربة مستخدم راقية تعكس جودة المنتجات مع نظام دفع إلكتروني آمن وسريع.",
    tech: ["Shopify", "React", "Tailwind CSS"]
  },
  { 
    id: 8, title: "منصة درر هب", cat: "تصميم مواقع", img: "/images/httpsdorarhub.com.png", client: "درر هب", link: "https://dorarhub.com",
    stats: { label: "تفاعل الزوار", val: "+300%" },
    description: "منصة إبداعية لتقديم الخدمات الرقمية المبتكرة وتطوير الأعمال، تعتمد على تصميم عصري وحيوي لجذب الزوار وتسهيل الوصول للخدمات.",
    tech: ["Next.js", "Node.js", "Framer Motion"]
  }
];

export default function PortfolioSection() {
  const [activeCat, setActiveCat] = useState("الكل");
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = activeCat === "الكل" ? portfolio : portfolio.filter(p => p.cat === activeCat);

  return (
    <section id="portfolio" className="py-24 bg-gray-50 border-b border-gray-100" aria-labelledby="portfolio-heading" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <span className="section-tag mb-4">أعمالنا</span>
            <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              أعمال تتحدث عن نفسها
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCat === c
                    ? "bg-[#4a9a10] text-white shadow-md shadow-green-100"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((item, i) => (
            <div key={item.id} className="reveal group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative h-[320px] w-full overflow-hidden bg-gray-100">
                <img
                  src={item.img}
                  alt={item.title}
                  
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#4a9a10] bg-[#f0f8e8] px-3 py-1 rounded-full">{item.cat}</span>
                  <span className="text-xs text-gray-500 font-medium">{item.client}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-5 group-hover:text-[#4a9a10] transition-colors">{item.title}</h3>
                <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{item.stats.label}</p>
                    <p className="font-black text-gray-900">{item.stats.val}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(item)}
                    className="mr-auto px-4 py-2 rounded-full bg-gray-50 flex items-center gap-2 text-sm font-bold text-gray-600 hover:bg-[#4a9a10] hover:text-white transition-all shadow-sm group-hover:shadow-md"
                  >
                    التفاصيل
                    <svg className="w-4 h-4 -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center reveal">
          <button className="border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-full font-bold text-base hover:border-gray-400 transition-colors">
            عرض المزيد من الأعمال
          </button>
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div 
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur flex items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="إغلاق"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative h-64 md:h-80 w-full bg-gray-100">
              <img 
                src={selectedProject.img} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#4a9a10] text-white text-xs font-bold rounded-full mb-3">
                    {selectedProject.cat}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white">{selectedProject.title}</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 mb-1">العميل</p>
                  <p className="font-bold text-gray-900">{selectedProject.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{selectedProject.stats.label}</p>
                  <p className="font-bold text-[#4a9a10]">{selectedProject.stats.val}</p>
                </div>
                {selectedProject.link && (
                  <div className="mr-auto">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                    >
                      زيارة المشروع
                      <svg className="w-4 h-4 -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">عن المشروع</h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.tech && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">التقنيات المستخدمة</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedProject(null)}></div>
        </div>
      )}

    </section>
  );
}
