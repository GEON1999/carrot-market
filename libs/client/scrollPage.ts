import { useEffect, useState } from "react";

export default function useScrollpage() {
  const [scrollPosition, setScrollPosition] = useState(1);
  const handleScroll = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.scrollHeight
    ) {
      setScrollPosition((p) => p + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
}
