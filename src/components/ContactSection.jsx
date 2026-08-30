"use client";
import { useState, useRef, useEffect } from "react";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "بريد إلكتروني غير صحيح";
    if (!form.service) errs.service = "اختر الخدمة";
    if (!form.message.trim()) errs.message = "الرسالة مطلوبة";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#6dc924]/30 bg-gray-50 ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#6dc924]"
    }`;

  return (
    <section id="contact" className="py-24 bg-white" aria-labelledby="contact-heading" ref={sectionRef}>
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div className="reveal">
            <span className="inline-block bg-[#e8f7db] text-[#58a71b] text-sm font-bold px-4 py-1.5 rounded-full mb-4">
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
                      <a href={item.href} className="text-gray-500 text-sm hover:text-[#6dc924] transition-colors">
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
                  className="w-11 h-11 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-[#6dc924] hover:text-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={social.stroke ? "none" : "currentColor"} stroke={social.stroke ? "currentColor" : ""} strokeWidth={social.stroke ? "2" : undefined} aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal bg-white rounded-3xl shadow-xl p-8 border border-gray-100" style={{ transitionDelay: "200ms" }}>
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="نموذج التواصل"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-bold text-gray-700 mb-1.5">
                    الاسم الكامل <span className="text-red-500" aria-label="حقل مطلوب">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    placeholder="أدخل اسمك الكامل"
                    className={inputClass("name")}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-bold text-gray-700 mb-1.5">
                    البريد الإلكتروني <span className="text-red-500" aria-label="حقل مطلوب">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    placeholder="example@email.com"
                    className={inputClass("email")}
                    dir="ltr"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="contactPhone" className="block text-sm font-bold text-gray-700 mb-1.5">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+966 5X XXX XXXX"
                  className={inputClass("phone")}
                  dir="ltr"
                  autoComplete="tel"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contactService" className="block text-sm font-bold text-gray-700 mb-1.5">
                  الخدمة المطلوبة <span className="text-red-500" aria-label="حقل مطلوب">*</span>
                </label>
                <select
                  id="contactService"
                  value={form.service}
                  onChange={(e) => { setForm({ ...form, service: e.target.value }); setErrors({ ...errors, service: "" }); }}
                  className={inputClass("service")}
                  aria-required="true"
                  aria-invalid={!!errors.service}
                >
                  <option value="" disabled>اختر الخدمة المناسبة</option>
                  <option value="marketing">التسويق الرقمي</option>
                  <option value="web">تصميم وتطوير المواقع</option>
                  <option value="app">تطوير التطبيقات</option>
                  <option value="design">الهوية البصرية والتصميم</option>
                  <option value="content">إدارة المحتوى</option>
                  <option value="support">الدعم الفني</option>
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="contactMessage" className="block text-sm font-bold text-gray-700 mb-1.5">
                  رسالتك <span className="text-red-500" aria-label="حقل مطلوب">*</span>
                </label>
                <textarea
                  id="contactMessage"
                  value={form.message}
                  onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                  rows={5}
                  placeholder="أخبرنا عن مشروعك وما تحتاجه..."
                  className={`${inputClass("message")} resize-none`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#6dc924] text-white py-4 px-8 rounded-full font-bold text-base hover:bg-[#58a71b] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-green-200"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    جاري الإرسال...
                  </>
                ) : (
                  "إرسال الرسالة ✉️"
                )}
              </button>

              {success && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 font-medium text-sm" role="alert">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
