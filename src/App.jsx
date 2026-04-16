import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Proficiency from "./components/Proficiency";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const revealRefs = useRef([]);
  const observerRef = useRef(null);
  const isAdminPage = currentPath === "/admin";

  useEffect(() => {
    const syncPath = () => setCurrentPath(window.location.pathname);

    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setScrollProgress(pct);

      const sections = ["home", "proficiency", "projects", "about", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    observerRef.current = obs;
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => {
      obs.disconnect();
      observerRef.current = null;
    };
  }, []);

  const addReveal = useCallback((el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
      observerRef.current?.observe(el);
    }
  }, []);

  const navigateToHome = () => {
    if (window.location.pathname !== "/") {
      window.history.pushState(null, "", "/");
      setCurrentPath("/");
    }
  };

  const openAdminPage = () => {
    window.history.pushState(null, "", "/admin");
    setCurrentPath("/admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id) => {
    navigateToHome();
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const scrollHome = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isAdminPage) {
    return (
      <>
        <div className="scroll-progress" style={{ transform: "scaleX(0)" }} />
        <Navbar
          activeSection="admin"
          isAdminPage
          onBrandClick={() => {
            navigateToHome();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onAdminClick={openAdminPage}
          scrollTo={scrollTo}
        />
        <main className="admin-page">
          <AdminPanel addReveal={addReveal} />
        </main>
      </>
    );
  }

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <Navbar
        activeSection={activeSection}
        onBrandClick={() => scrollHome("home")}
        onAdminClick={openAdminPage}
        scrollTo={scrollTo}
      />
      <Hero scrollTo={scrollHome} />
      <Proficiency addReveal={addReveal} />
      <Projects addReveal={addReveal} />
      <About addReveal={addReveal} />
      <Contact addReveal={addReveal} />
      <Footer scrollTo={scrollHome} />
    </>
  );
}
