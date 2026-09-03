"use client";
import { useEffect } from "react";

export default function SEO({ title, description, image, url, type = "website", noindex = false }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | BrandMe - وكالة رقمية`;
    }

    const setMeta = (name, content, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
      setMeta("twitter:description", description, true);
    }
    if (title) {
      setMeta("og:title", title, true);
      setMeta("twitter:title", title, true);
    }
    if (image) {
      setMeta("og:image", image, true);
      setMeta("twitter:image", image, true);
    }
    if (url) {
      setMeta("og:url", url, true);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", url);
      } else {
        const link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        link.setAttribute("href", url);
        document.head.appendChild(link);
      }
    }
    setMeta("og:type", type, true);
    setMeta("og:site_name", "BrandMe Agency", true);
    setMeta("og:locale", "ar_SA", true);

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    }
  }, [title, description, image, url, type, noindex]);

  return null;
}
