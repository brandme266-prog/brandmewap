"use client";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import { categories, portfolio } from "../data/portfolio.js";

export default function PortfolioSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [activeCat, setActiveCat] = useState(isAr ? "الكل" : "All");
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".rv").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const allLabel = isAr ? "الكل" : "All";
  const categoriesList = [allLabel, ...categories.filter(c => c !== "الكل")];

  const filtered = activeCat === allLabel
    ? portfolio
    : portfolio.filter(p => p.tags.includes(activeCat) || p.cat === activeCat);

  const featured = filtered.filter(p => p.tier === 1);
  const rest = filtered.filter(p => p.tier !== 1);

  return (
    <section id="portfolio" ref={ref}>
      {/* Hero Header */}
      <div className="wrap" style={{ paddingTop: "clamp(3rem, 7vw, 6.5rem)", paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        <div className="rv" style={{ "--d": "0s" }}>
          <span className="kick">{isAr ? "الأعمال" : "Work"}</span>
        </div>
        <h1 className="h1 rv" style={{ marginTop: "1.4rem", marginBottom: "1.6rem", "--d": "0.08s" }}>
          {isAr ? (
            <>
              <span>نبني الأنظمة</span>
              <span style={{ color: "#2F6A08" }}>التي تُدار بها الشركات.</span>
            </>
          ) : (
            <>
              <span>We build the systems</span>
              <span style={{ color: "#2F6A08" }}>businesses run on.</span>
            </>
          )}
        </h1>
        <p className="lead rv" style={{ "--d": "0.16s" }}>
          {isAr
            ? "منصات مبيعات، أنظمة تشغيل، أسواق إلكترونية، ومتاجر — بالعربية والإنجليزية."
            : "Sales platforms, operations systems, marketplaces and storefronts — in Arabic and English."}
        </p>
      </div>

      {/* Featured Work */}
      {featured.length > 0 && (
        <div className="wrap sec">
          <div className="sechead rv" style={{ "--d": "0s" }}>
            <span className="kick">{isAr ? "الأعمال الأبرز" : "Featured work"}</span>
            <h2 className="h2">{isAr ? "مشاريع رائدة تعمل فعليًا" : "Flagship projects in production"}</h2>
          </div>

          <div className="feat">
            {featured.map((p, i) => (
              <div key={p.id} className="fcard rv" style={{ "--d": `${0.1 + i * 0.1}s` }}>
                {/* Media — Browser Frame */}
                <div className="fcard__media">
                  <Link to={`/portfolio/${p.slug}`} className="fcard__shot frame">
                    <div className="frame__bar">
                      <i /><i /><i />
                      <span>{p.url || p.slug}</span>
                    </div>
                    <div className="frame__win">
                      <img
                        src={p.hero}
                        alt={`${p.title} — ${p.sub}`}
                        style={{ aspectRatio: "16/10", objectFit: "cover", objectPosition: "top center" }}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                  <span className="fcard__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <span className="fcard__cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p className="fcard__sub">{p.sub}</p>
                  <p className="fcard__line">{p.description}</p>
                  <Link to={`/portfolio/${p.slug}`} className="fcard__link">
                    {isAr ? "عرض المشروع" : "View project"}
                    <i style={{
                      display: "block", width: 14, height: 14, background: "currentColor",
                      WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                      mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                    }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div className="wrap sec" style={{ borderTop: "1px solid #E3E6DF" }}>
        <div className="sechead rv" style={{ "--d": "0s" }}>
          <span className="kick">{isAr ? "كل المشاريع" : "All projects"}</span>
          <h2 className="h2">{isAr ? `${filtered.length} مشروعًا يعمل فعليًا` : `${filtered.length} systems in production`}</h2>
        </div>

        {/* Filters */}
        <div className="filters rv" style={{ "--d": "0.08s" }}>
          {categoriesList.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className="filt"
              aria-pressed={activeCat === c}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {rest.length > 0 ? (
          <div className="grid">
            {rest.map((p, i) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.slug}`}
                className="pcard rv"
                style={{ "--d": `${0.05 + i * 0.05}s`, "--tint": p.tint || "#F2F3EF" }}
              >
                <div className={`pcard__img ${p.portrait ? "pcard__img--p" : ""}`} style={{ background: p.tint || "#F2F3EF" }}>
                  <img
                    src={p.hero}
                    alt={`${p.title} — ${p.description}`}
                    loading="lazy"
                  />
                </div>
                <div className="pcard__b">
                  <span className="pcard__cat">{p.cat}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="pcard__go">
                    {isAr ? "عرض التفاصيل" : "View details"}
                    <i style={{
                      display: "block", width: 13, height: 13, background: "currentColor",
                      WebkitMask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                      mask: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3 7.2h8.2L8.1 4.1l1.1-1.1L14.2 8l-5 5-1.1-1.1 3.1-3.1H3z'/%3E%3C/svg%3E") center/contain no-repeat`,
                    }} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty">{isAr ? "لا يوجد شيء في هذه الفئة." : "Nothing in this category."}</p>
        )}
      </div>
    </section>
  );
}
