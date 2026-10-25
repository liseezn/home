"use client";
import { useEffect } from "react";
export default function Analytics() {
  useEffect(() => {
    window._paq = window._paq || [];
    window._paq.push(["trackPageView"]); window._paq.push(["enableLinkTracking"]);
    window._paq.push(["setTrackerUrl", "https://stats.liseezn.top/matomo.php"]); window._paq.push(["setSiteId", "1"]);
    if (!document.querySelector('script[data-matomo="liseezn"]')) {
      const script = document.createElement("script"); script.async = true; script.dataset.matomo = "liseezn"; script.src = "https://stats.liseezn.top/matomo.js"; document.head.appendChild(script);
    }
  }, []);
  return null;
}
