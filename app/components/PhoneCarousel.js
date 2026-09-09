"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import ContentPreviewSlider from "./ContentPreviewSlider";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import styles from "./PhoneCarousel.module.css";

// The same six positions and spring animation as the FanLine homepage.
const stackSlots = [
  { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 60 },
  { x: 150, y: 28, scale: 0.86, rotate: 8, opacity: 0.86, zIndex: 48 },
  { x: 286, y: 62, scale: 0.72, rotate: 14, opacity: 0.56, zIndex: 30 },
  { x: 0, y: 72, scale: 0.68, rotate: 0, opacity: 0.42, zIndex: 18 },
  { x: -286, y: 62, scale: 0.72, rotate: -14, opacity: 0.56, zIndex: 30 },
  { x: -150, y: 28, scale: 0.86, rotate: -8, opacity: 0.86, zIndex: 48 },
];

export default function PhoneCarousel({ app, priority = false }) {
  const images = app.promoImages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [stageWidth, setStageWidth] = useState(500);
  const stageRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const wrapIndex = (index) => (index + images.length) % images.length;
  const closePreview = useCallback(() => setPreviewIndex(null), []);

  const phoneWidth = Math.round(Math.min(230, Math.max(142, stageWidth * 0.39)));
  const phoneHeight = Math.round(phoneWidth * 1.87);
  const farAngle = (14 * Math.PI) / 180;
  const farVisualWidth =
    phoneWidth * 0.72 * Math.cos(farAngle) +
    phoneHeight * 0.72 * Math.sin(farAngle);
  const xScale = Math.min(1, Math.max(0, (stageWidth - farVisualWidth) / 2 - 12) / 286);
  const yScale = Math.min(1, Math.max(0.56, stageWidth / 750));
  const isPaused = reduceMotion || !isPlaying || isHovered || hasFocus || !isVisible || previewIndex !== null;

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !document.querySelector("dialog[open]")) {
        setActiveIndex((index) => (index + 1) % images.length);
      }
    }, 3200);
    return () => window.clearInterval(timer);
  }, [images.length, isPaused]);

  useEffect(() => {
    const stage = stageRef.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setStageWidth(entry.contentRect.width);
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    resizeObserver.observe(stage);
    intersectionObserver.observe(stage);
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <section
      className={styles.carousel}
      aria-label={`${app.name} promo carousel`}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
    >
      <div
        ref={stageRef}
        className={styles.stage}
      >
        {images.map((image, imageIndex) => {
          const slotIndex = wrapIndex(imageIndex - activeIndex);
          const slot = stackSlots[slotIndex];
          return (
            <motion.button
              type="button"
              key={image.src}
              className={styles.phone}
              initial={false}
              animate={{
                x: Math.round(slot.x * xScale),
                y: Math.round(slot.y * yScale),
                scale: slot.scale,
                rotate: slot.rotate,
                opacity: slot.opacity,
              }}
              transition={reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 36, mass: 0.9 }}
              style={{ zIndex: slot.zIndex }}
              onClick={() => {
                setActiveIndex(imageIndex);
                setPreviewIndex(imageIndex);
              }}
              aria-label={`Open ${image.alt}`}
              aria-current={slotIndex === 0 ? "true" : undefined}
              aria-haspopup="dialog"
            >
              <span className={styles.screen}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 480px) 290px, 440px"
                  className={styles.image}
                  priority={priority && imageIndex === 0}
                  draggable={false}
                />
              </span>
            </motion.button>
          );
        })}
        <button
          type="button"
          className={`${styles.arrow} ${styles.previous}`}
          onClick={() => setActiveIndex((index) => wrapIndex(index - 1))}
          aria-label={`Show previous ${app.name} promo`}
        >
          <ChevronLeft size={23} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={() => setActiveIndex((index) => wrapIndex(index + 1))}
          aria-label={`Show next ${app.name} promo`}
        >
          <ChevronRight size={23} aria-hidden="true" />
        </button>
      </div>
      <div className={styles.controls}>
        <div className={styles.dots} aria-label={`Choose ${app.name} promo`}>
          {images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${app.name} promo ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <span />
            </button>
          ))}
        </div>
        {!reduceMotion && (
          <button
            type="button"
            className={styles.playback}
            onClick={() => {
              if (!isPlaying) {
                setHasFocus(false);
                setIsHovered(false);
              }
              setIsPlaying((playing) => !playing);
            }}
            aria-label={`${isPlaying ? "Pause" : "Play"} ${app.name} carousel`}
          >
            {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
      <p className={styles.hint}>Tap a preview to explore</p>
      <ContentPreviewSlider
        images={images}
        initialIndex={previewIndex ?? activeIndex}
        isOpen={previewIndex !== null}
        onClose={closePreview}
        label={`${app.name} promo preview`}
      />
    </section>
  );
}
