"use client";
import { useRef, useEffect } from "react";

export default function ContactSection() {
  const sectionRef = useRef(null);

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
  }, []);

  return (
    <section id="contact" className="py-24 bg-white" aria-labelledby="contact-heading" ref={sectionRef}>
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div className="reveal">
            <span className="inline-block bg-[#e8f7db] text-[#3d820d] text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              تواصل معنا
            </span>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              هل أنت مستعد للانطلاق؟
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              أخبرنا عن مشروعك وسنبدأ رحلة النجاح معاً. فريقنا جاهز للاستماع والمساعدة
            </p>

            <div className="space-y-6 mb-10" role="list">
              {[
                { icon: "📧", title: "البريد الإلكتروني", val: "info@brandmeofficial.com", href: "mailto:info@brandmeofficial.com" },
                { icon: "📍", title: "الموقع", val: "الرياض، المملكة العربية السعودية | مصر، المنصورة" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4" role="listitem">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-gray-500 text-sm hover:text-[#4a9a10] transition-colors">
                        {item.val}
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-3" aria-label="وسائل التواصل الاجتماعي">
              {[
                { label: "تويتر", icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
                { label: "إنستغرام", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>, stroke: true },
                { label: "لينكدإن", icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></> },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-[#4a9a10] hover:text-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={social.stroke ? "none" : "currentColor"} stroke={social.stroke ? "currentColor" : ""} strokeWidth={social.stroke ? "2" : undefined} aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="reveal bg-white rounded-3xl shadow-xl p-10 border border-gray-100 flex flex-col items-center text-center" style={{ transitionDelay: "200ms" }}>
            <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#25D366]" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">تواصل معنا عبر الواتساب</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              أرسل لنا رسالة الآن وسنرد عليك خلال دقائق. مشروعك يبدأ من هنا!
            </p>
            <a
              href="https://wa.me/201002052205?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A8%D9%83%D9%85%20BrandMe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-[#1da851] transition-all duration-300 shadow-lg shadow-green-200 hover:shadow-xl hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              ابدأ المحادثة الآن
            </a>
            <p className="text-gray-500 text-sm mt-4">+20 10 02052205</p>
          </div>
        </div>
      </div>
    </section>
  );
}
