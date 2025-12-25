import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
    
    // Also ensure document and body are at top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Handle any scroll containers
    const scrollContainers = document.querySelectorAll('[style*="overflow"], [class*="scroll"]');
    scrollContainers.forEach(container => {
      if (container.scrollTop !== undefined) {
        container.scrollTop = 0;
      }
    });
  }, [pathname]);

  return null;
}

