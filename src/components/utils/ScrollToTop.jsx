import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const resetScroll = () => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };

    // Force a re-render and scroll reset
    navigate(pathname, { replace: true });
    resetScroll();
  }, [pathname, navigate]);

  return null;
}

export default ScrollToTop;
