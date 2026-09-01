"use client";
import { useEffect, useRef } from "react";

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "جودة لا تُساوم",
    desc: "كل مشروع نُسلّمه يمرّ بمراحل مراجعة صارمة لضمان أعلى معايير الجودة العالمية.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "التسليم في الوقت",
    desc: "نلتزم بالمواعيد التي نحددها دون تأخير — لأن وقتك جزء من استثمارك.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: "شراكة استراتيجية",
    desc: "لا نعاملك كعميل فحسب — نتعامل مع مشروعك كأنه مشروعنا ونضع نجاحك هدفاً مشتركاً.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "نتائج قابلة للقياس",
    desc: "كل قرار نتخذه مبني على بيانات حقيقية — ليس تخميناً بل تحليلاً وقياساً مستمراً.",
  },
];

const milestones = [
  { year: "2018", label: "تأسيس الوكالة" },
  { year: "2020", label: "توسّع إقليمي" },
  { year: "2022", label: "100+ عميل" },
  { year: "2024", label: "حضور في 12 دولة" },
];

export default function AboutSection() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-white border-b border-gray-100 overflow-hidden" aria-labelledby="about-heading" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="section-tag mb-4">من نحن</span>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-4 leading-tight">
            أكثر من مجرد وكالة رقمية
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            منذ 2018 ونحن نبني قصص نجاح حقيقية لعملائنا في كل أنحاء العالم العربي وما وراءه — بفريق متخصص يعمل بشغف وبمنهجية محكمة.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v, i) => (
            <div
              key={i}
              className="reveal group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#6dc924]/50 hover:shadow-xl hover:shadow-[#6dc924]/5 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center mb-5 border border-gray-100 group-hover:bg-[#f0fce8] group-hover:text-[#3d8a10] group-hover:border-[#c8e6a0] transition-colors">
                {v.icon}
              </div>
              <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-[#6dc924] transition-colors">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal bg-gray-50 rounded-3xl border border-gray-100 p-8 md:p-12 mb-8">
          <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">رحلتنا عبر السنين</p>
          <div className="relative">
            {/* Line */}
            <div className="absolute top-5 right-[12.5%] left-[12.5%] h-0.5 bg-gray-200 hidden md:block" aria-hidden="true">
              <div className="h-full bg-[#6dc924] w-3/4"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              {milestones.map((m, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mb-4 border-2 z-10 ${
                    i === milestones.length - 1
                      ? "bg-[#6dc924] text-white border-[#6dc924] shadow-md shadow-green-100"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}>
                    {i + 1}
                  </div>
                  <p className="font-black text-gray-900 text-lg leading-none mb-1">{m.year}</p>
                  <p className="text-gray-500 text-sm">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="reveal grid grid-cols-3 gap-6">
          {[
            { val: "50+", label: "خبير متخصص", desc: "مصمم، مطور، مسوّق" },
            { val: "8",   label: "سنوات خبرة", desc: "في السوق الرقمي" },
            { val: "12",  label: "دولة نخدمها", desc: "حضور إقليمي ودولي" },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-4xl font-black text-[#6dc924] leading-none mb-2">{s.val}</p>
              <p className="font-bold text-gray-900 text-sm mb-1">{s.label}</p>
              <p className="text-gray-500 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
