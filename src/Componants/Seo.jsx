import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoRoutes, defaultSeo } from "../constants/seoConfig";

function matchRoute(pathname) {
  const pathSegments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  let dynamicMatch = null;
  for (const [pattern, meta] of seoRoutes) {
    const patternSegments = pattern.split("/").filter(Boolean);
    if (pathSegments.length !== patternSegments.length) continue;
    const isMatch = patternSegments.every((seg, i) => seg.startsWith(":") || seg === pathSegments[i]);
    if (isMatch) {
      if (pattern.includes(":")) {
        if (!dynamicMatch) dynamicMatch = meta;
      } else {
        return meta;
      }
    }
  }
  return dynamicMatch;
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = matchRoute(location.pathname) || defaultSeo;
    document.title = meta.title;

    setMeta("name", "description", meta.description || defaultSeo.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description || defaultSeo.description);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description || defaultSeo.description);
    setMeta(
      "name",
      "robots",
      meta.noindex ? "noindex, nofollow" : "index, follow"
    );
  }, [location.pathname]);

  return null;
}
