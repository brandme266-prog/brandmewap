import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const siteUrl = "https://brandme-api.brandme266.workers.dev";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BrandMe | وكالة تسويق رقمي وبرمجة مواقع وتطبيقات",
    template: "%s | BrandMe - وكالة رقمية",
  },
  description:
    "BrandMe وكالة رقمية متكاملة متخصصة في التسويق الرقمي، تصميم وبرمجة مواقع الويب، تطبيقات الموبايل، هوية البصمة التجارية. خبرة +8 سنوات، 230+ عميل، 12 دولة، 99% رضا العملاء.",
  keywords: [
    "وكالة تسويق رقمي",
    "تصميم مواقع",
    "برمجة مواقع ويب",
    "تطوير تطبيقات",
    "تصميم هوية تجارية",
    "SEO",
    "تحسين محركات البحث",
    "إدارة سوشيال ميديا",
    "إعلانات جوجل",
    " تصميم متجر إلكتروني",
    " BrandMe",
    "وكالة إعلانات رقمية",
    "تسويق عبر الإنترنت",
    "تصميم لوجو",
    "برمجة تطبيقات موبايل",
    "تطوير أنظمة ERP",
    "استشارات رقمية",
    "web design",
    "digital marketing agency",
    "app development",
    "branding agency",
  ],
  authors: [{ name: "BrandMe Agency", url: siteUrl }],
  creator: "BrandMe Agency",
  publisher: "BrandMe Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ar": siteUrl,
      "en": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    siteName: "BrandMe Agency",
    title: "BrandMe | وكالة تسويق رقمي وبرمجة مواقع وتطبيقات",
    description:
      "وكالة رقمية متكاملة متخصصة في التسويق الرقمي وبرمجة المواقع والتطبيقات. +8 سنوات خبرة، 230+ عميل، 12 دولة.",
    url: siteUrl,
    locale: "ar_SA",
    alternateLocale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/logo/logo.webp`,
        width: 240,
        height: 80,
        alt: "BrandMe Agency - وكالة تسويق رقمي",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandMe | وكالة تسويق رقمي وبرمجة مواقع",
    description:
      "وكالة رقمية متكاملة - التسويق الرقمي، تصميم المواقع، تطوير التطبيقات. 230+ عميل في 12 دولة.",
    images: [`${siteUrl}/images/logo/logo.webp`],
    creator: "@brandme",
  },
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4a9a10",
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BrandMe Agency",
    alternateName: "براند مي",
    url: siteUrl,
    logo: `${siteUrl}/images/logo/logo.webp`,
    description:
      "وكالة رقمية متكاملة متخصصة في التسويق الرقمي وبرمجة المواقع والتطبيقات",
    foundingDate: "2016",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 25,
    },
    areaServed: [
      { "@type": "Country", name: "مصر" },
      { "@type": "Country", name: "السعودية" },
      { "@type": "Country", name: "الإمارات" },
      { "@type": "Country", name: "الكويت" },
      { "@type": "Country", name: "قطر" },
      { "@type": "Country", name: "البحرين" },
      { "@type": "Country", name: "عمان" },
    ],
    serviceType: [
      "التسويق الرقمي",
      "تصميم المواقع",
      "برمجة التطبيقات",
      "تصميم الهوية البصرية",
      "إدارة وسائل التواصل الاجتماعي",
      "تحسين محركات البحث SEO",
      "إعلانات جوجل",
      "تطوير المتاجر الإلكترونية",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "230",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+201093078796",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BrandMe Agency",
    alternateName: "براند مي - وكالة رقمية",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: "ar",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BrandMe Agency",
    image: `${siteUrl}/images/logo/logo.webp`,
    url: siteUrl,
    telephone: "+201093078796",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "23:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "230",
    },
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <meta name="msapplication-TileColor" content="#4a9a10" />
        <meta name="theme-color" content="#4a9a10" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://brandme-api.brandme266.workers.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900" suppressHydrationWarning style={{ fontFamily: "'Almarai', sans-serif" }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
