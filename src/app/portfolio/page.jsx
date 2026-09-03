"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioSection from "@/components/PortfolioSection";
import SEO from "@/components/SEO";

export default function PortfolioPage() {
  return (
    <>
      <SEO
        title="أعمالنا | BrandMe"
        description="تصفح سابقة أعمالنا في تصميم وبرمجة المواقع والمتاجر الإلكترونية وتطبيقات الجوال."
        image="/images/logo/logo.webp"
        url="https://brandmeofficial.com/portfolio"
      />
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <PortfolioSection />
      </main>
      <Footer />
    </>
  );
}
