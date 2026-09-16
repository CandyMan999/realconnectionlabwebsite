"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import ContentPreviewSlider from "./ContentPreviewSlider";
import styles from "./CineCuePage.module.css";

export default function CineCueScreenshots({ app, hero = false }) {
  const [previewIndex, setPreviewIndex] = useState(null);
  const closePreview = useCallback(() => setPreviewIndex(null), []);
  const images = app.screenshots.map((src, index) => ({ src, alt: `CineCue app screenshot ${index + 1}` }));
  const visibleIndexes = hero ? [0] : images.map((_, index) => index).filter((index) => index !== 2);

  return <>
    <div className={hero ? styles.heroArt : styles.gallery}>
      {visibleIndexes.map((index) => <button
        key={images[index].src}
        type="button"
        className={styles.screenshotButton}
        aria-label={`Open CineCue screenshot ${index + 1}`}
        aria-haspopup="dialog"
        onClick={() => setPreviewIndex(index)}
      >
        <Image src={images[index].src} alt={images[index].alt} width={369} height={800}
          priority={hero} sizes={hero ? "(max-width: 760px) 85vw, 350px" : "(max-width: 600px) 72vw, 280px"} />
      </button>)}
    </div>
    <ContentPreviewSlider images={images} initialIndex={previewIndex ?? 0}
      isOpen={previewIndex !== null} onClose={closePreview} label="CineCue screenshot preview" />
  </>;
}
