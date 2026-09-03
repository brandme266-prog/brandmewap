"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";

const HeroSection = lazy(() => import("@/components/HeroSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SoftwareSection = lazy(() => import("@/components/SoftwareSection"));
const StepsSection = lazy(() => import("@/components/StepsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const BlogSection = lazy(() => import("@/components/BlogSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

function SectionLoader() {
  return (
    <div className="py-20 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#4a9a10] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SEO
        title="BrandMe | وكالة تسويق رقمي وبرمجة مواقع وتطبيقات"
        description="BrandMe وكالة رقمية متكاملة متخصصة في التسويق الرقمي، تصميم وبرمجة مواقع الويب، تطبيقات الموبايل، هوية البصمة التجارية. +8 سنوات خبرة، 230+ عميل، 12 دولة."
        image="/images/logo/logo.webp"
        url="https://brand1me.com"
      />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SoftwareSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <StepsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BrandMe",
            url: "https://brandmeofficial.com",
            description: "وكالة رقمية متكاملة متخصصة في التسويق الرقمي والبرمجة والتصميم",
            areaServed: "Arab World",
            knowsAbout: ["Digital Marketing", "Web Development", "Graphic Design", "SEO"],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["Arabic", "English"],
            },
          }),
        }}
      />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 left-6 z-50 w-12 h-12 bg-[#4a9a10] text-white rounded-full shadow-lg shadow-green-200 flex items-center justify-center hover:bg-[#3d820d] transition-all duration-300 ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="العودة لأعلى الصفحة"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}
