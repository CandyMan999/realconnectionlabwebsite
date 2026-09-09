"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContentPreviewSlider.module.css";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

const wrapIndex = (index, length) => length ? ((index % length) + length) % length : 0;
const SWIPE_THRESHOLD = 56;

export default function ContentPreviewSlider({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  label = "Screenshot preview"
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [selection, setSelection] = useState({
    index: initialIndex,
    initialIndex,
    isOpen
  });
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dotsRef = useRef(null);
  const modalSessionRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const imageCount = images.length;
  const shouldOpen = isOpen && imageCount > 0;
  const currentIndex = wrapIndex(selection.index, imageCount);

  // Reset before children mount, so opening a later screenshot never animates
  // the track from the previously selected screenshot.
  if (selection.isOpen !== shouldOpen || selection.initialIndex !== initialIndex) {
    setSelection({
      index: shouldOpen ? wrapIndex(initialIndex, imageCount) : selection.index,
      initialIndex,
      isOpen: shouldOpen
    });
  }

  const showPrevious = useCallback(() => {
    setSelection((current) => ({
      ...current,
      index: wrapIndex(current.index - 1, imageCount)
    }));
  }, [imageCount]);

  const showNext = useCallback(() => {
    setSelection((current) => ({
      ...current,
      index: wrapIndex(current.index + 1, imageCount)
    }));
  }, [imageCount]);

  const releaseModal = useCallback(() => {
    const session = modalSessionRef.current;
    if (!session) return;

    modalSessionRef.current = null;
    if (session.dialog.open) session.dialog.close();

    Object.assign(document.body.style, session.bodyStyles);
    document.documentElement.style.overflow = session.rootOverflow;
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(session.scrollX, session.scrollY);
    if (session.trigger?.isConnected) session.trigger.focus({ preventScroll: true });
    document.documentElement.style.scrollBehavior = scrollBehavior;
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return releaseModal;
  }, [releaseModal]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isMounted || !shouldOpen || !dialog || dialog.open) return;

    const body = document.body;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    const originalPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const bodyStyles = {};
    for (const property of ["position", "top", "left", "width", "overflow", "paddingRight"]) {
      bodyStyles[property] = body.style[property];
    }

    modalSessionRef.current = {
      dialog,
      trigger: document.activeElement instanceof HTMLElement ? document.activeElement : null,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      bodyStyles,
      rootOverflow: document.documentElement.style.overflow
    };

    Object.assign(body.style, {
      position: "fixed",
      top: `${-window.scrollY}px`,
      left: `${-window.scrollX}px`,
      width: "100%",
      overflow: "hidden",
      paddingRight: `${originalPadding + scrollbarWidth}px`
    });
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [isMounted, shouldOpen]);

  useEffect(() => {
    if (!shouldOpen) return;
    const dots = dotsRef.current;
    const activeDot = dots?.children[currentIndex];
    if (!dots || !activeDot) return;
    dots.scrollTo({
      left: activeDot.offsetLeft - (dots.clientWidth - activeDot.clientWidth) / 2,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [currentIndex, isMounted, reduceMotion, shouldOpen]);

  function handleKeyDown(event) {
    if (!shouldOpen || event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === "ArrowLeft") showPrevious();
      else showNext();
    }

    if (event.key === "Tab") {
      const buttons = Array.from(dialogRef.current.querySelectorAll("button:not([disabled])"));
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault();
        lastButton?.focus();
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault();
        firstButton?.focus();
      }
    }
  }

  if (!isMounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={label}
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <AnimatePresence onExitComplete={() => { if (!shouldOpen) releaseModal(); }}>
        {shouldOpen && (
          <motion.div
            key="preview"
            className={styles.preview}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : {
              opacity: 0,
              y: "100%",
              transition: { duration: 0.22, ease: "easeInOut" }
            }}
            transition={reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 210, damping: 28, mass: 0.92 }}
          >
            <button
              ref={closeButtonRef}
              className={`${styles.control} ${styles.close}`}
              type="button"
              onClick={onClose}
              aria-label="Close preview"
            >
              <X size={24} aria-hidden="true" />
            </button>

            {imageCount > 1 && (
              <button
                className={`${styles.control} ${styles.arrow} ${styles.previous}`}
                type="button"
                onClick={showPrevious}
                aria-label="Show previous screenshot"
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
            )}

            <div className={styles.viewport}>
              <motion.div
                className={styles.dragSurface}
                drag={imageCount > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={reduceMotion ? 0 : 0.12}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) showNext();
                  else if (info.offset.x > SWIPE_THRESHOLD) showPrevious();
                }}
              >
                <motion.div
                  className={styles.track}
                  initial={false}
                  animate={{ x: `${currentIndex * -100}%` }}
                  transition={reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 250, damping: 30 }}
                >
                  {images.map((image, index) => {
                    const distance = Math.abs(index - currentIndex);
                    const isNearby = distance <= 1 || distance === imageCount - 1;

                    return (
                      <div
                        className={styles.slide}
                        key={`${typeof image.src === "string" ? image.src : image.src.src}-${index}`}
                        aria-hidden={index !== currentIndex}
                      >
                        {isNearby && (
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="100vw"
                            className={styles.image}
                            loading={index === currentIndex ? "eager" : "lazy"}
                            draggable={false}
                          />
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>

            {imageCount > 1 && (
              <>
                <button
                  className={`${styles.control} ${styles.arrow} ${styles.next}`}
                  type="button"
                  onClick={showNext}
                  aria-label="Show next screenshot"
                >
                  <ChevronRight size={28} aria-hidden="true" />
                </button>
                <div className={styles.dots} ref={dotsRef} aria-label="Choose screenshot">
                  {images.map((image, index) => (
                    <button
                      key={`${image.alt}-${index}`}
                      className={index === currentIndex ? styles.activeDot : styles.dot}
                      type="button"
                      onClick={() => setSelection((current) => ({ ...current, index }))}
                      aria-label={`Show screenshot ${index + 1}`}
                      aria-pressed={index === currentIndex}
                    />
                  ))}
                </div>
              </>
            )}

            <p className={styles.status} aria-live="polite" aria-atomic="true">
              Screenshot {currentIndex + 1} of {imageCount}: {images[currentIndex]?.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>,
    document.body
  );
}
