"use client";
import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    stars: 5,
    text: "من أفضل الشركات التي تعاملت معها في حياتي. فريق BrandMe يجمع بين الاحترافية العالية والشغف الحقيقي. النتائج تجاوزت كل توقعاتي.",
    name: "أحمد الشهري",
    role: "المدير التنفيذي",
    company: "noon",
    avatarColor: "#3b82f6",
    highlight: "+280% نمو في المبيعات",
  },
  {
    stars: 5,
    text: "تعاونّا مع BrandMe في تطوير منصتنا الرقمية وحملاتنا التسويقية. فريق متميز يفهم السوق ويعرف بالضبط كيف يحقق الهدف.",
    name: "سارة بنت عبدالله",
    role: "مديرة التسويق",
    company: "tamara",
    avatarColor: "#ec4899",
    highlight: "+1M مستخدم في 6 أشهر",
  },
  {
    stars: 5,
    text: "النتائج الحقيقية تتحدث عن نفسها. BrandMe حوّلت استراتيجيتنا الرقمية من الصفر إلى مستوى يُحتذى به في السوق.",
    name: "محمد العزري",
    role: "الرئيس التنفيذي",
    company: "jahez",
    avatarColor: "#f59e0b",
    highlight: "+320% معدل تحويل",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 bg-gray-50 border-b border-gray-100 overflow-hidden" aria-labelledby="testimonials-heading" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <span className="section-tag mb-4">آراء عملائنا</span>
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              شريكك نحو<br /><span className="text-[#6dc924]">النجاح الحقيقي</span>
            </h2>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
            نلتزم بتقديم أعلى مستوى من الجودة في كل مشروع، ونعتبر رضا عملائنا مقياسنا الأول للنجاح.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`reveal cursor-pointer rounded-2xl p-8 border transition-all duration-300 ${
                active === i
                  ? "bg-white border-[#c8e6a0] shadow-xl shadow-green-50"
                  : "bg-white/50 border-gray-100 hover:border-gray-200 hover:bg-white"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(t.stars)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">
                "{t.text}"
              </p>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-6 bg-[#f0fce8] text-[#2d6a08] border border-[#c8e6a0]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
                {t.highlight}
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: t.avatarColor }} aria-hidden="true">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role} · <span className="font-semibold text-gray-700">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 reveal">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`شهادة ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-8 bg-[#6dc924]" : "w-2 bg-gray-300"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
