import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
}

export default function SEO({
  title,
  description,
  keywords = "AI website builder, instant landing pages, zero code generator, web design, responsive templates, Genixor",
  ogType = "website",
  ogImage = "/og-image.png",
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = `${title} | Genixor - AI Website Builder`;
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const updateOrCreateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Update Meta Description
    updateOrCreateMeta("description", description);

    // 3. Update Meta Keywords
    updateOrCreateMeta("keywords", keywords);

    // 4. Open Graph Tags
    updateOrCreateMeta("og:title", formattedTitle, true);
    updateOrCreateMeta("og:description", description, true);
    updateOrCreateMeta("og:type", ogType, true);
    updateOrCreateMeta("og:url", canonicalUrl, true);
    updateOrCreateMeta("og:image", `${window.location.origin}${ogImage}`, true);

    // 5. Twitter Tags
    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", formattedTitle);
    updateOrCreateMeta("twitter:description", description);
    updateOrCreateMeta("twitter:image", `${window.location.origin}${ogImage}`);

    // 6. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [title, description, keywords, ogType, ogImage, canonicalUrl]);

  return null;
}
