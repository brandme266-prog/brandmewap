"use client";
import { useEffect, useRef } from "react";

const steps = [
  { num: "1", title: "فهم احتياجاتك", desc: "نستمع إلى رؤيتك ونحلل متطلباتك لنضع خطة عمل مدروسة." },
  { num: "2", title: "استراتيجية مخصصة", desc: "نصمم حلاً مخصصاً يناسب أهدافك والوصول لجمهورك." },
  { num: "3", title: "تنفيذ احترافي", desc: "فريق من الخبراء يطبّق الحل بدقة وأعلى معايير الجودة." },
  { num: "4", title: "متابعة وتحسين", desc: "نراقب النتائج ونحسّن باستمرار لضمان أفضل عائد." },
  { num: "5", title: "نتائج حقيقية", desc: "نحقق نتائج ملموسة وقابلة للقياس تعكس نجاحك." },
];

export default function StepsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16 reveal">
          <span className="section-tag mb-4">خطوات العمل</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-4 leading-tight">
            خطوات واضحة لنجاح مشروعك
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            نتبع منهجية مثبتة في كل مشروع لضمان تحقيق أفضل النتائج بأعلى كفاءة.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 right-0 left-0 h-px border-t-2 border-dashed border-gray-200 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="reveal flex flex-col items-center text-center group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mb-5 border-4 border-white transition-all duration-300 ${
                  i === 4 
                    ? "bg-[#6dc924] text-white shadow-lg shadow-green-100 scale-110" 
                    : "bg-gray-50 text-gray-700 border-gray-100 group-hover:bg-[#f0fce8] group-hover:text-[#3d8a10] group-hover:border-[#c8e6a0]"
                }`}>
                  {step.num}
                </div>
                <h3 className={`font-black text-base mb-2 transition-colors ${i === 4 ? "text-[#6dc924]" : "text-gray-900 group-hover:text-[#6dc924]"}`}>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 reveal">
          <button onClick={go} className="bg-[#6dc924] text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-[#58a71b] transition-colors shadow-lg shadow-green-100">
            ابدأ مشروعك الآن
          </button>
        </div>

      </div>
    </section>
  );
}
