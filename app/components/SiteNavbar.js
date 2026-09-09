"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Mail, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { apps, company } from "../data/apps";
import BrandLogo from "./BrandLogo";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import styles from "./SiteNavbar.module.css";

const navItems = [
  { href: "/", label: "Home" },
  ...apps.map((app) => ({ href: app.path, label: app.displayName ?? app.name })),
  { href: "/#contact", label: "Contact" },
];
const mobileQuery = "(max-width: 980px)";

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = usePrefersReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);
  const brandRef = useRef(null);
  const callRef = useRef(null);
  const closeRef = useRef(null);
  const sessionRef = useRef(null);
  const pendingHrefRef = useRef(null);
  const activeLockUntilRef = useRef(0);
  const scrollTargetRef = useRef(null);

  const releaseMenu = useCallback((restoreFocus = true) => {
    const session = sessionRef.current;
    if (!session) return;
    sessionRef.current = null;
    session.removeKeyHandler();
    session.inertElements.forEach(([element, wasInert]) => { element.inert = wasInert; });
    Object.assign(document.body.style, session.bodyStyles);
    document.documentElement.style.overflow = session.rootOverflow;
    window.scrollTo({ left: session.scrollX, top: session.scrollY, behavior: "instant" });
    if (restoreFocus && toggleRef.current?.getClientRects().length) {
      toggleRef.current.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => releaseMenu(false);
  }, [releaseMenu]);

  useEffect(() => {
    setIsOpen(false);
    pendingHrefRef.current = null;
    releaseMenu(false);
    if (pathname !== "/") {
      setIsContactActive(false);
      return;
    }

    let frame;
    const updateContact = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (sessionRef.current || Date.now() < activeLockUntilRef.current) return;
        const contact = document.getElementById("contact");
        const rect = contact?.getBoundingClientRect();
        setIsContactActive(Boolean(rect && rect.top < window.innerHeight * 0.65 && rect.bottom > 82));
      });
    };
    updateContact();
    window.addEventListener("scroll", updateContact, { passive: true });
    window.addEventListener("resize", updateContact);
    window.addEventListener("hashchange", updateContact);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateContact);
      window.removeEventListener("resize", updateContact);
      window.removeEventListener("hashchange", updateContact);
    };
  }, [pathname, releaseMenu]);

  useEffect(() => {
    const target = scrollTargetRef.current;
    if (!target || target.split("#")[0] !== pathname) return;
    const frame = window.requestAnimationFrame(() => {
      scrollTargetRef.current = null;
      const hash = target.split("#")[1];
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "instant", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const closeOnDesktop = () => {
      if (!media.matches) {
        pendingHrefRef.current = null;
        setIsOpen(false);
        releaseMenu(false);
      }
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, [releaseMenu]);

  useEffect(() => {
    if (!isOpen || sessionRef.current) return;

    const bodyStyles = {};
    for (const property of ["position", "top", "left", "width", "overflow", "paddingRight"]) {
      bodyStyles[property] = document.body.style[property];
    }
    const inertElements = [document.querySelector("main"), brandRef.current, callRef.current]
      .filter(Boolean)
      .map((element) => [element, element.inert]);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
      if (event.key !== "Tab") return;
      const controls = drawerRef.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawerRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawerRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    sessionRef.current = {
      bodyStyles,
      inertElements,
      rootOverflow: document.documentElement.style.overflow,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      removeKeyHandler: () => document.removeEventListener("keydown", handleKeyDown),
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    Object.assign(document.body.style, {
      position: "fixed",
      top: `${-window.scrollY}px`,
      left: `${-window.scrollX}px`,
      width: "100%",
      overflow: "hidden",
      paddingRight: `${padding + scrollbarWidth}px`,
    });
    document.documentElement.style.overflow = "hidden";
    inertElements.forEach(([element]) => { element.inert = true; });
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  function isActive(href) {
    if (href === "/#contact") return pathname === "/" && isContactActive;
    if (href === "/") return pathname === "/" && !isContactActive;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function navigate(href) {
    if (href === "/" || href === "/#contact") {
      activeLockUntilRef.current = Date.now() + 1400;
      setIsContactActive(href === "/#contact");
    }
    if (pathname === "/" && (href === "/" || href === "/#contact")) {
      window.history.pushState(null, "", href);
      const behavior = reduceMotion ? "instant" : "smooth";
      if (href === "/") window.scrollTo({ top: 0, behavior });
      else document.getElementById("contact")?.scrollIntoView({ behavior, block: "start" });
    } else if (href === pathname) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
    } else {
      scrollTargetRef.current = href;
      router.push(href, { scroll: false });
    }
  }

  function handleNavigate(event, href, fromDrawer = false) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (fromDrawer) {
      pendingHrefRef.current = href;
      setIsOpen(false);
    } else navigate(href);
  }

  function finishClose() {
    if (isOpen) return;
    const href = pendingHrefRef.current;
    pendingHrefRef.current = null;
    releaseMenu(!href);
    if (href) navigate(href);
  }

  const underlineTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 30 };

  return (
    <LayoutGroup id="real-connection-navigation">
      <header className={styles.header}>
        <nav className={styles.inner} aria-label="Primary navigation">
          <Link
            ref={brandRef}
            className={styles.brand}
            href="/"
            aria-label="Real Connection Lab home"
            onClick={(event) => handleNavigate(event, "/")}
          >
            <BrandLogo />
            <span className={styles.wordmark}>
              <strong>Real Connection</strong>
              <span>Lab LLC</span>
            </span>
          </Link>

          <div className={styles.links}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.link}
                aria-current={isActive(item.href) ? (item.href.includes("#") ? "location" : "page") : undefined}
                onClick={(event) => handleNavigate(event, item.href)}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    className={styles.underline}
                    layoutId="desktop-underline"
                    initial={false}
                    transition={underlineTransition}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <a ref={callRef} className={styles.call} href={company.phoneHref} aria-label={`Call Real Connection Lab at ${company.phone}`}>
              <Phone size={16} aria-hidden="true" />
              <span className={styles.desktopCall}>{company.phone}</span>
              <span className={styles.mobileCall}>Call us</span>
            </a>
            <button
              ref={toggleRef}
              className={styles.menuButton}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span className={styles.menuLine} initial={false} animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} />
              <motion.span className={styles.menuLine} initial={false} animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} />
              <motion.span className={styles.menuLine} initial={false} animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} />
            </button>
          </div>
        </nav>
      </header>
      <div className={styles.spacer} aria-hidden="true" />

      {isMounted && createPortal(
        <AnimatePresence onExitComplete={finishClose}>
          {isOpen && (
            <>
              <motion.div
                key="overlay"
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                key="drawer"
                ref={drawerRef}
                id="mobile-navigation"
                className={styles.drawer}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                initial={reduceMotion ? { opacity: 1 } : { x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
              >
                <div className={styles.drawerHeading}>
                  <span>Navigation</span>
                  <button ref={closeRef} type="button" className={styles.drawerClose} aria-label="Close menu" onClick={() => setIsOpen(false)}>
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
                <nav className={styles.drawerLinks} aria-label="Mobile app navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      className={styles.drawerLink}
                      href={item.href}
                      aria-current={isActive(item.href) ? (item.href.includes("#") ? "location" : "page") : undefined}
                      onClick={(event) => handleNavigate(event, item.href, true)}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span className={styles.drawerUnderline} layoutId="mobile-underline" initial={false} transition={underlineTransition} />
                      )}
                    </Link>
                  ))}
                </nav>
                <div className={styles.drawerFooter}>
                  <a className={styles.drawerCall} href={company.phoneHref} onClick={() => setIsOpen(false)}>
                    <Phone size={16} aria-hidden="true" />
                    {company.phone}
                  </a>
                  <a className={styles.email} href={company.emailHref} onClick={() => setIsOpen(false)}>
                    <Mail size={16} aria-hidden="true" />
                    Email support
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </LayoutGroup>
  );
}
