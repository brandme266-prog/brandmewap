"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
import SEO from "@/components/SEO";

const siteUrl = "https://brand1me.com";

export default function PortfolioPage() {
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "سابقة أعمال BrandMe | معرض المشاريع",
    description:
      "تصفح 15 مشروعًا حيًا أنجزته BrandMe: منصات SaaS، أنظمة ERP، متاجر إلكترونية، تطبيقات جوال، وذكاء اصطناعي — في مصر والخليج العربي.",
    url: `${siteUrl}/portfolio`,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      name: "BrandMe Agency",
      url: siteUrl,
    },
    about: {
      "@type": "Organization",
      name: "BrandMe Agency",
      url: siteUrl,
    },
    hasPart: [
      {
        "@type": "SoftwareApplication",
        name: "SaaS Broker — Estate4AI",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://estate4ai.com/",
        description: "مساعد ذكي يردّ على واتساب، ويؤهّل العميل، ويطابقه بوحدات موجودة فعلًا في مخزونك.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EGP" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Brand-Me OS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web + Android",
        url: "https://brandme-os.pages.dev/",
        description: "وكالة كاملة على شاشة واحدة — المبيعات والفواتير والحملات والفريق.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Restaurant SaaS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://restaurant-saas-6z5.pages.dev/",
        description: "قناة طلبات خاصة بالمطعم: صفحته، ورموزه، وأسعاره — بلا تطبيق.",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "أعمالنا", item: `${siteUrl}/portfolio` },
    ],
  };

  return (
    <>
      <SEO
        title="سابقة أعمال BrandMe | 15 مشروعًا حيًا في SaaS والمتاجر والتطبيقات"
        description="تصفح 15 مشروعًا حيًا أنجزته BrandMe: منصات SaaS، أنظمة إدارة أعمال، متاجر إلكترونية، تطبيقات جوال، وذكاء اصطناعي — في مصر والسعودية والإمارات."
        image="/images/portfolio_hero.webp"
        url={`${siteUrl}/portfolio`}
        type="website"
      />
      <meta name="keywords" content="سابقة أعمال, مشاريع, تصميم مواقع, تطبيقات جوال, SaaS, متجر إلكتروني, ERP, CRM, BrandMe, وكالة رقمية, أعمال برمجية" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50" id="main-content">
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
