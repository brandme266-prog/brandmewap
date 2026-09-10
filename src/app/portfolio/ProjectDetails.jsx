import { useParams, Link } from "react-router-dom";
import { portfolio } from "../../data/portfolio.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import SEO from "../../components/SEO.jsx";
import { useEffect } from "react";

const siteUrl = "https://brand1me.com";

export default function ProjectDetails() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const idx = portfolio.findIndex(p => p.slug === slug);
  const project = idx !== -1 ? portfolio[idx] : null;
  const prev = idx > 0 ? portfolio[idx - 1] : null;
  const next = idx < portfolio.length - 1 ? portfolio[idx + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#FBFBF9" }}>
        <SEO
          title="مشروع غير موجود | BrandMe"
          description="المشروع الذي تبحث عنه غير موجود."
          noindex={true}
        />
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0C0F0C", marginBottom: "1rem" }}>
              {isAr ? "المشروع غير موجود" : "Project not found"}
            </h1>
            <Link to="/portfolio" style={{ color: "#2F6A08", fontWeight: 600, borderBottom: "1.5px solid #4A9A10", paddingBottom: 2 }}>
              {isAr ? "العودة لمعرض الأعمال" : "Back to portfolio"}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const projectUrl = `${siteUrl}/portfolio/${project.slug}`;
  const projectTitle = `${project.title} — ${project.sub} | BrandMe`;
  const projectDesc = project.what || project.description;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    alternateName: project.sub,
    applicationCategory: "BusinessApplication",
    operatingSystem: project.platform,
    url: project.link || projectUrl,
    description: projectDesc,
    image: project.hero,
    author: { "@type": "Organization", name: "BrandMe Agency", url: siteUrl },
    provider: { "@type": "Organization", name: "BrandMe Agency", url: siteUrl },
    ...(project.link && {
      offers: { "@type": "Offer", price: "0", priceCurrency: "EGP", availability: "https://schema.org/InStock" },
    }),
    softwareVersion: "1.0",
    applicationSubCategory: project.category,
    featureList: (project.features || []).join(", "),
    screenshot: project.hero,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", reviewCount: "50" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "أعمالنا", item: `${siteUrl}/portfolio` },
      { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
    ],
  };

  const faqSchema = project.features && project.features.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `ما هو مشروع ${project.title}؟`, acceptedAnswer: { "@type": "Answer", text: projectDesc } },
      { "@type": "Question", name: `ما هي التقنيات المستخدمة في ${project.title}؟`, acceptedAnswer: { "@type": "Answer", text: `يستخدم مشروع ${project.title} التقنيات التالية: ${(project.tech || []).join("، ")}.` } },
      { "@type": "Question", name: `ما هي ميزات ${project.title}؟`, acceptedAnswer: { "@type": "Answer", text: (project.features || []).join(" — ") } },
    ],
  } : null;

  return (
    <div style={{ background: "#FBFBF9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SEO title={projectTitle} description={projectDesc} image={project.hero} url={projectUrl} type="article" />
      <meta name="keywords" content={`${project.title}, ${project.sub}, ${project.cat}, ${project.category}, BrandMe, ${(project.tech || []).join(", ")}`} />
      <link rel="canonical" href={projectUrl} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <Navbar />

      <main style={{ flex: 1, paddingTop: "clamp(5rem, 10vw, 7rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }} id="main-content">
        <div style={{ maxWidth: 960, marginInline: "auto", paddingInline: "clamp(1.25rem, 4vw, 4.5rem)" }}>

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <ol style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#5E665E", listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link to="/" style={{ transition: "color .2s", color: "inherit" }} onMouseOver={e => e.target.style.color = "#2F6A08"} onMouseOut={e => e.target.style.color = "inherit"}>{isAr ? "الرئيسية" : "Home"}</Link></li>
              <li style={{ opacity: 0.5 }}>/</li>
              <li><Link to="/portfolio" style={{ transition: "color .2s", color: "inherit" }} onMouseOver={e => e.target.style.color = "#2F6A08"} onMouseOut={e => e.target.style.color = "inherit"}>{isAr ? "أعمالنا" : "Portfolio"}</Link></li>
              <li style={{ opacity: 0.5 }}>/</li>
              <li style={{ color: "#0C0F0C", fontWeight: 600 }}>{project.title}</li>
            </ol>
          </nav>

          {/* Back Link */}
          <Link to="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#5E665E", fontWeight: 600, marginBottom: "2.5rem", transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color = "#0C0F0C"} onMouseOut={e => e.currentTarget.style.color = "#5E665E"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)" }}>
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isAr ? "العودة للأعمال" : "Back to work"}
          </Link>

          {/* Header */}
          <header>
            <span className="kick" style={{ marginBottom: "0.8rem" }}>{project.cat}</span>
            <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.2rem, 5.5vw, 4rem)", fontWeight: 700, color: "#0C0F0C", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0.8rem 0 0.3rem" }}>
              {project.title}
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", color: "#5E665E", fontWeight: 500 }}>{project.sub}</p>
          </header>

          {/* Hero — Browser Frame */}
          <div style={{ marginTop: "2rem" }} className="frame">
            <div className="frame__bar">
              <i /><i /><i />
              <span>{project.url || project.slug}</span>
            </div>
            <div className="frame__win">
              <img
                src={project.hero}
                alt={`${project.title} — ${project.sub}`}
                style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
          </div>

          {/* Meta */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid #E3E6DF" }}>
            <div>
              <dt style={{ fontSize: "0.72rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "#5E665E", marginBottom: "0.3rem", fontWeight: 600 }}>{isAr ? "العميل" : "Client"}</dt>
              <dd style={{ margin: 0, fontSize: "0.98rem", fontWeight: 500 }}>{project.client}</dd>
            </div>
            <div>
              <dt style={{ fontSize: "0.72rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "#5E665E", marginBottom: "0.3rem", fontWeight: 600 }}>{isAr ? "المنصة" : "Platform"}</dt>
              <dd style={{ margin: 0, fontSize: "0.98rem", fontWeight: 500 }}>{project.platform}</dd>
            </div>
            <div>
              <dt style={{ fontSize: "0.72rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "#5E665E", marginBottom: "0.3rem", fontWeight: 600 }}>{isAr ? "التصنيف" : "Category"}</dt>
              <dd style={{ margin: 0, fontSize: "0.98rem", fontWeight: 500 }}>{project.category}</dd>
            </div>
            {project.link && (
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ fontSize: "0.88rem" }}
                >
                  {isAr ? " زيارة المشروع" : "Visit Project"}
                  <i style={{
                    display: "block", width: 15, height: 15, background: "currentColor", flex: "none",
                    WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                    mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                    transition: "transform .3s cubic-bezier(.16,1,.3,1)",
                  }} />
                </a>
              </div>
            )}
          </div>

          {/* What it is */}
          <section style={{ marginTop: "2.5rem" }}>
            <h2 className="blk__h">{isAr ? "ما هو" : "What it is"}</h2>
            <p style={{ color: "#3A413A", fontSize: "clamp(1.05rem, 1.6vw, 1.24rem)", lineHeight: 1.5, fontWeight: 500 }}>{project.what}</p>
          </section>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section style={{ marginTop: "2.2rem" }}>
              <h2 className="blk__h">{isAr ? "أبرز القدرات" : "Key capabilities"}</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {project.features.map((f, i) => (
                  <li key={i} style={{ position: "relative", padding: "0.6rem 0 0.6rem 1.4rem", borderBottom: "1px solid #E3E6DF", fontSize: "0.95rem", color: "#3A413A" }}>
                    <span style={{ position: "absolute", insetInlineStart: 0, top: "1.15rem", width: 7, height: 7, borderRadius: "50%", background: "#4A9A10" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Value */}
          {project.value && (
            <div className="value" style={{ marginTop: "2.2rem", background: "#0C0F0C", color: "#fff", padding: "1.6rem 1.7rem" }}>
              <h2 className="blk__h" style={{ color: "#8CD32B" }}>{isAr ? "لماذا يهم" : "Why it matters"}</h2>
              <p style={{ color: "#E6E9E3", fontSize: "1.02rem", margin: 0 }}>{project.value}</p>
            </div>
          )}

          {/* Tech Tags */}
          {project.tech && (
            <section style={{ marginTop: "2.2rem" }}>
              <h2 className="blk__h">{isAr ? "التقنيات" : "Technology"}</h2>
              <div className="tags">
                {project.tech.map((t, i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>
            </section>
          )}

          {/* Disclosure */}
          {project.disclose && (
            <div className="disc" style={{ marginTop: "2rem" }}>{project.disclose}</div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section style={{ marginTop: "2rem" }}>
              <h2 className="blk__h">{isAr ? "لقطات إضافية" : "Additional screenshots"}</h2>
              <div className="gal">
                {project.gallery.map((img, i) => (
                  <div key={i} className="frame">
                    <div className="frame__win">
                      <img
                        src={img}
                        alt={`${project.title} — لقطة شاشة ${i + 1}`}
                        style={{ width: "100%", objectFit: "cover" }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginTop: "2.6rem", paddingTop: "1.8rem", borderTop: "1px solid #E3E6DF" }}>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn">
                {isAr ? "افتح المنتج" : "Open the live product"}
                <i style={{
                  display: "block", width: 15, height: 15, background: "currentColor", flex: "none",
                  WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                  mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                }} />
              </a>
            )}
            <Link to="/portfolio" className="btn btn--ghost">
              {isAr ? "العودة لجميع المشاريع" : "Back to all projects"}
            </Link>
          </div>

          {/* Prev / Next */}
          <nav style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #E3E6DF" }} aria-label={isAr ? "تنقل بين المشاريع" : "Project navigation"}>
            {prev ? (
              <Link to={`/portfolio/${prev.slug}`} style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.2rem", background: "#fff", border: "1px solid #E3E6DF", transition: "border-color .3s, box-shadow .35s" }} onMouseOver={e => { e.currentTarget.style.borderColor = "#C9CEC3"; e.currentTarget.style.boxShadow = "0 12px 32px -16px rgba(12,15,12,.3)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "#E3E6DF"; e.currentTarget.style.boxShadow = "none"; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5E665E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)", flexShrink: 0 }}>
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div>
                  <p style={{ fontSize: "0.72rem", color: "#5E665E", margin: 0 }}>{isAr ? "المشروع السابق" : "Previous"}</p>
                  <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#0C0F0C", margin: "0.15rem 0 0" }}>{prev.title}</p>
                </div>
              </Link>
            ) : <div style={{ flex: 1 }} />}

            {next ? (
              <Link to={`/portfolio/${next.slug}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.75rem", padding: "1rem 1.2rem", background: "#fff", border: "1px solid #E3E6DF", textAlign: "left", transition: "border-color .3s, box-shadow .35s" }} onMouseOver={e => { e.currentTarget.style.borderColor = "#C9CEC3"; e.currentTarget.style.boxShadow = "0 12px 32px -16px rgba(12,15,12,.3)"; }} onMouseOut={e => { e.currentTarget.style.borderColor = "#E3E6DF"; e.currentTarget.style.boxShadow = "none"; }}>
                <div>
                  <p style={{ fontSize: "0.72rem", color: "#5E665E", margin: 0 }}>{isAr ? "المشروع التالي" : "Next"}</p>
                  <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#0C0F0C", margin: "0.15rem 0 0" }}>{next.title}</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5E665E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
