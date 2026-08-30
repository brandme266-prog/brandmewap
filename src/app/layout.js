import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "BrandMe | Digital Marketing & Development Agency",
  description:
    "BrandMe is a full-service digital agency specialized in digital marketing, development, and creative design. Serving 230+ clients in 12 countries with 99% satisfaction rate.",
  keywords:
    "digital marketing, web design, app development, brandme, SEO, social media marketing",
  authors: [{ name: "BrandMe Agency" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "BrandMe | Digital Marketing Agency",
    description: "Full-service digital agency for marketing, development & design",
    url: "https://brandmeofficial.com/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandMe | Digital Marketing Agency",
    description: "Full-service digital agency - 230+ clients in 12 countries",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
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
