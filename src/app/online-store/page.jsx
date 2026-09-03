"use client";
import { useEffect, useRef, useState, useMemo } from "react";

import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const target = new Date("2026-09-05T00:00:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: { ar: "يوم", en: "Days" } },
    { value: timeLeft.hours, label: { ar: "ساعة", en: "Hours" } },
    { value: timeLeft.minutes, label: { ar: "دقيقة", en: "Min" } },
    { value: timeLeft.seconds, label: { ar: "ثانية", en: "Sec" } },
  ];

  if (!mounted) return <div className="flex gap-3 justify-center">{units.map((u, i) => (
    <div key={i} className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0d3b3e] flex items-center justify-center shadow-lg">
        <span className="text-3xl md:text-4xl font-black text-white">00</span>
      </div>
      <span className="text-xs font-bold text-gray-500 mt-2">{u.label.ar}</span>
    </div>
  ))}</div>;

  return (
    <div className="flex gap-3 justify-center">
      {units.map((u, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0d3b3e] flex items-center justify-center shadow-lg">
            <span className="text-3xl md:text-4xl font-black text-white">{String(u.value).padStart(2, "0")}</span>
          </div>
          <span className="text-xs font-bold text-gray-500 mt-2">{u.label.ar}</span>
        </div>
      ))}
    </div>
  );
}

const proFeatures = [
  "رابط خاص (دومين .COM)",
  "شهر مجانا خدمة مدير المتجر",
  "استشارة تسوقية مجانا على يد خبراء",
  "تصاميم جاهزة مميزة واحترافية",
  "شهادة أمان HTTPs - SSL",
  "منتجات و طلبات لا محدودة",
  "الربط مع بوابات الدفع",
  "خيارات اللون والمقاس للمنتج",
  "المنتجات حسب الماركات",
  "نظام بحث ذكي",
  "سلايدر متحرك للعروض",
  "عرض الأقسام بأشكال متغيرة",
  "قسم المنتجات الأكثر طلبات",
  "قسم المنتجات الحديثة",
  "ميزة تخفيض سعر - قبل/بعد",
  "أيقونات السوشيل ميديا",
  "أيقونة واتساب عائمة",
  "اقسام رئيسية وفرعية متعددة",
  "معرض صور للمنتج",
  "تقييمات المنتج",
  "وسم مخصص لكل منتج",
  "كوبونات الخصم والتخفيض",
  "تخصيص ألوان الموقع",
  "تخصيص نوع الخطوط في الموقع",
  "صديق لمحركات البحث",
  "إدارة المخزون والضريبة",
  "إيميلات رسمية بإسم موقعك",
  "تخصيص عروض الشحن",
  "خاصية إضافة للمفضلة",
  "خيارات المنتج المتقدمة",
  "خاصية المشاركة السريعة للمنتج",
  "نظام مخزون/الكمية للمنتجات",
  "الربط مع شركات الشحن",
  "إضافة موظفين والصلاحيات",
  "طرق دفع متعددة",
  "طرق إستلام وتوصيل مختلفة",
  "اضافة أحجام ومقاسات متنوعة",
  "نظام التقارير والاحصائيات",
  "اصدار فواتري الطلبات PDF",
];

const miniFeatures = [
  { icon: "📦", title: { ar: "إدارة المنتجات", en: "Product Management" }, desc: { ar: "أضف منتجاتك وقم بإدارتها بكل سهولة. عدل الأسعار والكمية ووصف المنتج من خلال اعدادات مباشرة وبسيطة.", en: "Add and manage your products with ease. Edit prices, quantity, and descriptions through simple settings." } },
  { icon: "📱", title: { ar: "متوافق مع الجوال", en: "Mobile Responsive" }, desc: { ar: "متجرك الإلكتروني سيكون متوافق 100% مع الجوال والأجهزة المحمولة.", en: "Your store will be 100% compatible with mobile and portable devices." } },
  { icon: "⚡", title: { ar: "إبدأ مباشرة", en: "Start Immediately" }, desc: { ar: "لا تحتاج للانتظار لأسابيع. يمكنك البدأ خلال بضع ساعات وسيكون موقعك متاح اونلاين.", en: "No need to wait weeks. You can start within a few hours and your site will be online." } },
  { icon: "🖼️", title: { ar: "معرض الصور والفيديو", en: "Photo & Video Gallery" }, desc: { ar: "أظهر مزايا منتجاتك من خلال معرض للصور. يمكنك أيضا رفع فيديو من يوتيوب.", en: "Showcase your products through a gallery. You can also upload video from YouTube." } },
  { icon: "🏷️", title: { ar: "تصنيفات المنتج", en: "Product Categories" }, desc: { ar: "قم بتقسيم منتجاتك كما يناسب نشاطك التجاري. يمكنك عمل أقسام فرعية.", en: "Divide your products as suits your business. You can create sub-sections." } },
  { icon: "🎨", title: { ar: "تنوع المنتجات", en: "Product Variety" } , desc: { ar: "يمكنك بيع أي منتج مع خيارات محددة لكل واحد، مثل اللون والمقاسات والحجم.", en: "You can sell any product with specific options like color, sizes, and volume." } },
  { icon: "👤", title: { ar: "حسابات العملاء", en: "Customer Accounts" }, desc: { ar: "إسم لعملائك بتسجيل حساب لحفظ بياناتهم وعناوين الشحن.", en: "Allow your customers to create accounts to save their data and shipping addresses." } },
  { icon: "📋", title: { ar: "إدارة الطلبات", en: "Order Management" }, desc: { ar: "قم بإدارة طلبات عملائك. عدل على الطلب أو إلغائه أو تمييزه كمكتمل.", en: "Manage your customer orders. Edit, cancel, or mark as complete." } },
  { icon: "⭐", title: { ar: "تقييم ومراجعة المنتج", en: "Product Reviews" }, desc: { ar: "إبني ثقة بينك وبين عملائك من خلال السماح بتقييم المنتج مع رفع صور.", en: "Build trust by allowing customers to rate products and upload photos." } },
  { icon: "💰", title: { ar: "ضريبة القيمة المضافة", en: "VAT Tax" }, desc: { ar: "يمكن إضافة نسبة الضريبة على القيمة المضافة واظهارها عند اتمام الطلب.", en: "Add VAT tax percentage and display it during checkout." } },
  { icon: "💳", title: { ar: "بوابات الدفع", en: "Payment Gateways" }, desc: { ar: "إقبل الدفع عبر شركات الدفع أو التحويل البنكي أو الدفع عند الاستلام.", en: "Accept payment via payment companies, bank transfer, or cash on delivery." } },
  { icon: "🚀", title: { ar: "الطلب سريعا", en: "Quick Checkout" }, desc: { ar: "قم بتقليل البيانات المطلوبة في صفحة اتمام الطلب لتجربة تسوق سهلة وسريعة.", en: "Reduce required data at checkout for an easy and quick shopping experience." } },
  { icon: "📊", title: { ar: "التقارير والتحليلات", en: "Reports & Analytics" }, desc: { ar: "احصل على تقارير عن أداء متجرك. يمكنك تصديرهم على شكل ملف إكسل.", en: "Get reports on your store performance. Export them as Excel files." } },
  { icon: "🎟️", title: { ar: "القسائم والخصومات", en: "Coupons & Discounts" }, desc: { ar: "قم بإنشاء كوبونات وقسائم خصم اما بنسبة مئوية او رقم ثابت.", en: "Create discount coupons as a percentage or fixed amount." } },
  { icon: "🚚", title: { ar: "طرق الشحن", en: "Shipping Methods" }, desc: { ar: "وفر طرق شحن متنوعة. استلام من المحل او تكلفة الشحن حسب المدينة.", en: "Offer multiple shipping methods. Pickup or shipping cost by city." } },
  { icon: "❤️", title: { ar: "المقارنة والمفضلة", en: "Compare & Favorites" }, desc: { ar: "مع خاصية المقارنة يمكن لعملائك المقارنة بين المنتجات. أيضا إضافة للمفضلات.", en: "Customers can compare products and add them to favorites." } },
  { icon: "🔔", title: { ar: "إشعارات العملاء", en: "Customer Notifications" }, desc: { ar: "سيتوصل عملائك باشعار عبر الإيميل. يمكنك أيضا اشعارات عبر SMS أو WhatsApp.", en: "Customers receive notifications via email. Also SMS or WhatsApp notifications." } },
  { icon: "🌍", title: { ar: "تعدد العملات واللغات", en: "Multi-Currency & Language" }, desc: { ar: "وفر لعملائك تجربة تسوق فريدة من خلال تعدد عملات ولغات على حسب الدولة.", en: "Provide a unique shopping experience with multiple currencies and languages." } },
];

const faqs = [
  { q: { ar: "ماهو نظام الإشتراك في خدمة تصميم المتاجر الإلكترونية؟", en: "What is the subscription system for online store design?" }, a: { ar: "المتجر يكون ملكك بالكامل مع ملفات المصدر وقاعدة البيانات. المبلغ المدفوع هو فقط تكلفة المتجر أول مرة شاملة الدومين والاستضافة لأول سنة.", en: "The store is entirely yours with source files and database. The paid amount is the one-time store cost including domain and hosting for the first year." } },
  { q: { ar: "عندما أتلقى طلب في متجرري الإلكتروني، هل هناك عمولة على الطلبات؟", en: "When I receive an order, are there commissions?" }, a: { ar: "لا، نحن لا نأخذ أي عمولة على مبيعاتك أو أرباحك. نحن لا نراقب الطلبات أو نقييدها بعدد معين.", en: "No, we don't take any commission on your sales or profits. We don't monitor or limit your orders." } },
  { q: { ar: "لو عندي دومين أو إستضافة، هل يمكن إستعمالها مع المتجر الإلكتروني؟", en: "Can I use my existing domain or hosting?" }, a: { ar: "بالنسبة للدومين نعم يمكنك إعلامنا وسنوجهك. أما الإستضافة فللاسف عدم استخدام إستضافتنا ي_rlheم عدم حصولك على تحديثات أو دعم فني.", en: "For domains, yes, let us know and we'll guide you. For hosting, using ours is required for updates and support." } },
  { q: { ar: "هل أقدر طلب تعديلات أو مميزات خاصة للمتجر الإلكتروني؟", en: "Can I request custom modifications?" }, a: { ar: "نعم، التعديلات البسيطة نحاول عملها مجانا. التعديلات الخاصة أو الإضافات复杂的 تكلف رسوم إضافية يتم الإتفاق عليها.", en: "Yes, we try simple modifications for free. Special or complex modifications cost additional agreed fees." } },
  { q: { ar: "هل ستقومون بإدخال المنتجات الخاصة بي في المتجر؟", en: "Will you add my products to the store?" }, a: { ar: "نعم، ولكن بتكلفة إضافية من خلال خدمة إدارة المتاجر الخاصة بنا.", en: "Yes, but at an additional cost through our store management service." } },
  { q: { ar: "ماهي المدة التي يمكن فيها تصميم المتجر الإلكتروني؟", en: "How long does it take to design the store?" }, a: { ar: "الباقة الأولى من 2-4 أيام، الباقة الثانية من 4-8 أيام، وباقة التطبيق من 7-14 يوم.", en: "Basic: 2-4 days, Professional: 4-8 days, App package: 7-14 days." } },
  { q: { ar: "هل سيتم تصميم شعار أو بنرات لموقعي الإلكتروني؟", en: "Will a logo or banners be designed?" }, a: { ar: "نعم، سيتم تصميم شعار مجانا عند الاشتراك في الباقة المدعومة. يمكنك طلب حتى 3 تعديلات.", en: "Yes, a logo will be designed for free with supported packages. You can request up to 3 modifications." } },
  { q: { ar: "هل هناك دعم فني لخدمة إنشاء المتاجر الإلكترونية؟", en: "Is there technical support?" }, a: { ar: "نعم، الدعم الفني للرد على الاستفسارات ومساعدتك في فهم كيفية التعديل وتخصيص متجرك.", en: "Yes, technical support for inquiries and helping you understand how to customize your store." } },
  { q: { ar: "هل هناك دفع إلكتروني في المتجر؟", en: "Is there electronic payment?" }, a: { ar: "نعم، بالإضافة لطرق الدفع اليدوية مثل الدفع عند الإستلام والتحويل البنكي. يمكنك إضافة الدفع إلكتروني.", en: "Yes, in addition to manual payment methods. You can add electronic payment." } },
];

const customizationFeatures = [
  { ar: "تعديل الألوان ونوع الخط وشكل الأزرار", en: "Edit colors, fonts, and button styles" },
  { ar: "تخصيص الصفحة الرئيسية باستخدام بنرات", en: "Customize homepage with banners" },
  { ar: "تمييز صفحة المنتج بشكل عصري وحديث", en: "Modern and trendy product page design" },
];

const paymentFeatures = [
  { ar: "دعم أكثر من 35+ بوابة دفع إلكترونية", en: "Support for 35+ payment gateways" },
  { ar: "إمكانية تفعيل Google Pay و Apple Pay", en: "Google Pay and Apple Pay activation" },
  { ar: "تفعيل طرق دفع يدوية مثل الدفع عند الإستلام", en: "Manual payment methods like Cash on Delivery" },
];

const shippingFeatures = [
  { ar: "توفير أكثر من خيار شحن عند اتمام الطلب", en: "Multiple shipping options at checkout" },
  { ar: "تفعيل رسوم الشحن حسب المدن او الدول", en: "Shipping fees by cities or countries" },
  { ar: "إمكانية الربط مع شركات الشحن المدعومة", en: "Integration with supported shipping companies" },
];

const productTypes = [
  { ar: "بيع المنتجات متعددة المقاس, اللون والحجم", en: "Sell products with multiple sizes, colors, and volumes" },
  { ar: "بيع منتجات أفلييت Affiliate", en: "Sell Affiliate products" },
  { ar: "بيع المنتجات الإفتراضية Virtual", en: "Sell Virtual products" },
  { ar: "بيع المنتجات التي تحتاج تحميل مثل كتب PDF", en: "Sell downloadable products like PDF books" },
];

export default function OnlineStorePage() {
  const { t, lang, toggleLang } = useLanguage();
  const sectionRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [currency, setCurrency] = useState("EGP");

  const prices = useMemo(() => ({
    EGP: { basic: "3,500", pro: "6,500", symbol: "ج" },
    USD: { basic: "70", pro: "130", symbol: "$" },
    SAR: { basic: "263", pro: "488", symbol: "ريال" },
  }), []);

  const p = prices[currency];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} ref={sectionRef}>
      <SEO
        title="المتجر الإلكتروني | تصميم وبرمجة متجر إلكتروني احترافي"
        description="تصميم وبرمجة متاجر إلكترونية احترافية بأقل تكلفة. 39 ميزة متكاملة، دفع إلكتروني، إدارة منتجات، لوحة تحكم. عرض خاص: خصم 50% لفترة محدودة."
        image="/images/logo/logo.webp"
        url="https://brandme-api.brandme266.workers.dev/online-store"
        type="product"
      />
      <Navbar />
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#4a9a10] rounded-full mix-blend-multiply blur-[128px] opacity-20 animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4a9a10] rounded-full mix-blend-multiply blur-[128px] opacity-10 animate-float-slow" />
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "radial-gradient(circle, #4a9a10 1px, transparent 1px)", backgroundSize: "40px 40px"}} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal inline-flex items-center gap-2 bg-[#4a9a10]/10 border border-[#4a9a10]/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#4a9a10] rounded-full animate-pulse" />
              <span className="text-[#4a9a10] font-bold text-sm">{lang === "ar" ? "عرض محدود لفترة محدودة جداً" : "Limited time offer"}</span>
            </div>
            <h1 className="reveal text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              {lang === "ar" ? "صمم متجرك" : "Build Your"}
              <br />
              <span className="text-gradient">{lang === "ar" ? "الإلكتروني الآن!" : "Online Store!"}</span>
            </h1>
            <p className="reveal text-xl text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto">
              {lang === "ar"
                ? "المتاجر الإلكترونية أصبحت من الوسائل الأساسية للتجارة الحديثة. ساعد عملائك على عرض منتجاتهم والتفاعل مع الزبائن بسهولة وفاعلية."
                : "Online stores have become essential for modern commerce. Help your customers showcase products and interact with visitors easily."}
            </p>
            <div className="reveal flex flex-wrap gap-4 justify-center">
              <a href="#pricing" className="inline-flex items-center gap-2 bg-[#4a9a10] text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-[#3d820d] transition-all hover:scale-105 shadow-lg shadow-[#4a9a10]/25">
                {lang === "ar" ? "الباقات والأسعار" : "Packages & Pricing"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Header + Countdown */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {lang === "ar" ? "أسعار تصميم المتاجر الإلكترونية" : "Online Store Design Pricing"}
            </h2>
            <p className="text-gray-500 text-lg mb-2">{lang === "ar" ? "عرض مميز لفترة محدودة جداً ..!" : "Special offer for a very limited time!"}</p>
            <CountdownTimer />
            <div className="flex justify-center gap-3 mt-8">
              {["EGP", "USD", "SAR"].map((c) => (
                <button key={c} onClick={() => setCurrency(c)}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${currency === c ? "bg-[#0d3b3e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {c === "EGP" ? (lang === "ar" ? "جنيه مصري" : "EGP") : c === "USD" ? (lang === "ar" ? "دولار أمريكي" : "USD") : (lang === "ar" ? "ريال سعودي" : "SAR")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 bg-white -mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Portfolio Website */}
            <div className="reveal bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#a8d67a] transition-all duration-300 hover:shadow-xl" style={{ transitionDelay: "100ms" }}>
              <h3 className="text-xl font-black text-gray-900 mb-1">{lang === "ar" ? "تصميم مواقع تعريفية" : "Portfolio Website"}</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl font-black text-gray-900">4,500</span>
                <span className="text-gray-500 font-bold">{p.symbol}</span>
                <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">-50%</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {[
                  "رابط خاص (دومين .COM)",
                  "شهادة أمان HTTPs - SSL",
                  "تصميم احترافي متوافق مع جميع الأجهزة",
                  "لوحة تحكم لتعديل المحتوى",
                  "SEO صديق لمحركات البحث",
                  "ربط مع السوشيل ميديا",
                  "أيقونة واتساب عائمة",
                  "سرعة تحميل عالية",
                  "معرض صور وأعمال",
                  "قسم نبذة عنا",
                  "قسم الخدمات",
                  "قسم آراء العملاء",
                  "قسم التواصل معنا",
                  "تخصيص الألوان والخطوط",
                  "استضافة مجانية لأول سنة",
                  "دعم فني مستمر",
                ].map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#4a9a10" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/201002052205?text=%D8%B9%D8%A7%D9%8A%D8%B2+%D8%A7%D8%B7%D9%84%D8%A8+%D8%AA%D8%B5%D9%85%D9%8A%D9%85+%D9%85%D9%88%D9%82%D8%B9+%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%D9%8A" target="_blank" rel="noopener noreferrer"
                className="block text-center py-4 rounded-2xl font-black text-lg bg-gray-100 text-gray-900 hover:bg-[#4a9a10] hover:text-white transition-all">
                {lang === "ar" ? "اطلب الآن ..!" : "Order Now!"}
              </a>
            </div>

            {/* Pro - Popular */}
            <div className="reveal bg-white rounded-3xl p-8 border-2 border-[#4a9a10] shadow-xl shadow-[#4a9a10]/10 relative transition-all duration-300 hover:scale-105" style={{ transitionDelay: "200ms" }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4a9a10] text-white px-6 py-1.5 rounded-full text-sm font-black whitespace-nowrap">
                {lang === "ar" ? "الأكثر طلباً" : "Most Popular"}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-1">{lang === "ar" ? "تصميم المتاجر الإلكترونية" : "Online Store"}</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl font-black text-gray-900">{p.pro}</span>
                <span className="text-gray-500 font-bold">{p.symbol}</span>
                <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">-50%</span>
              </div>
              <p className="text-gray-400 text-sm mb-6 line-through">{lang === "ar" ? "بدلاً من 12,500 ج" : "Was 12,500 EGP"}</p>
              <ul className="space-y-2.5 mb-8">
                {proFeatures.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#4a9a10" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                    {j === 0 ? <span className="font-bold text-[#3d8a10]">{f} 😍</span> : f}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/201002052205" target="_blank" rel="noopener noreferrer"
                className="block text-center py-4 rounded-2xl font-black text-lg bg-[#4a9a10] text-white hover:bg-[#3d820d] transition-all shadow-lg shadow-[#4a9a10]/25">
                {lang === "ar" ? "إشترك الآن ..!" : "Subscribe Now!"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="section-tag mb-4">{lang === "ar" ? "مميزات المتجر" : "Store Features"}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">{lang === "ar" ? "طور نشاطك التجاري للأفضل" : "Grow Your Business for the Best"}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miniFeatures.map((f, i) => (
              <div key={i} className="reveal bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#a8d67a] hover:shadow-lg transition-all duration-300 group" style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-black text-gray-900 mb-2 group-hover:text-[#4a9a10] transition-colors">{f.title[lang]}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="section-tag mb-4">{lang === "ar" ? "أسئلة متكررة" : "FAQ"}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">{lang === "ar" ? "أسئلة متكررة عن المتاجر الإلكترونية" : "Frequently Asked Questions"}</h2>
            <p className="text-gray-500 mt-4">{lang === "ar" ? "تحقق من بعض الأسئلة الأكثر شيوعاً عن خدمة تصميم المتاجر" : "Check some of the most common questions about store design service"}</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal border border-gray-100 rounded-2xl overflow-hidden" style={{ transitionDelay: `${i * 50}ms` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-right hover:bg-gray-50 transition-colors">
                  <span className="font-black text-gray-900">{faq.q[lang]}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mr-4 ${openFaq === i ? "rotate-180" : ""}`}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-500 leading-relaxed">{faq.a[lang]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-[#4a9a10] rounded-full mix-blend-multiply blur-[128px] opacity-20" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-[#4a9a10] rounded-full mix-blend-multiply blur-[128px] opacity-10" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 reveal">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {lang === "ar" ? "لسه ما عندك متجر إلكتروني؟ بيفوتك الكثير.." : "Don't Have an Online Store Yet? You're Missing Out.."}
          </h2>
          <p className="text-white/60 text-xl mb-10 max-w-2xl mx-auto">
            {lang === "ar" ? "أنشئ متجر إلكتروني لعملائك من مختلف دول العالم، وتفوق على منافسيك. وفر لعملائك تجربة تسوق فريدة وسهلة." : "Create an online store for customers worldwide. Outperform your competitors. Provide a unique and easy shopping experience."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/201002052205" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#4a9a10] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#3d820d] transition-all hover:scale-105 shadow-lg shadow-[#4a9a10]/25">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {lang === "ar" ? "أنشئ متجرك الآن" : "Create Your Store Now"}
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "تصميم وبرمجة متجر إلكتروني - BrandMe",
            description: "تصميم وبرمجة متجر إلكتروني احترافي بـ 39 ميزة متكاملة مع دفع إلكتروني وإدارة منتجات ولوحة تحكم",
            brand: { "@type": "Brand", name: "BrandMe Agency" },
            offers: {
              "@type": "Offer",
              price: "6500",
              priceCurrency: "EGP",
              availability: "https://schema.org/InStock",
              validFrom: "2026-08-30",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "230",
            },
          }),
        }}
      />
    </div>
  );
}
