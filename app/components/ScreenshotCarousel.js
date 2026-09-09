"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import ContentPreviewSlider from "./ContentPreviewSlider";

export default function ScreenshotCarousel({ app }) {
  const railRef = useRef(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const closePreview = useCallback(() => setPreviewIndex(null), []);
  const images = useMemo(() => app.screenshots.map((src, index) => ({
    src,
    alt: `${app.name} app screen ${index + 1}`,
  })), [app.name, app.screenshots]);

  function scrollByCard(direction) {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const card = rail.querySelector(".screenshot-frame");
    const gap = app.screenshotPreview
      ? parseFloat(window.getComputedStyle(rail).columnGap) || 0
      : 18;
    const distance = card ? card.getBoundingClientRect().width + gap : 320;

    rail.scrollBy({
      left: direction * distance,
      behavior: app.screenshotPreview && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  }

  return (
    <div className="carousel-shell" aria-label={`${app.name} screenshots`}>
      <div className="carousel-heading">
        <p>Product Screens</p>
        <div className="carousel-controls">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={`Previous ${app.name} screenshot`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={`Next ${app.name} screenshot`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="screenshot-rail" ref={railRef}>
        {app.screenshots.map((src, index) => (
          <figure className={`screenshot-frame${app.screenshotPreview ? " screenshot-artwork" : ""}`} key={src}>
            {app.screenshotPreview ? (
              <button
                type="button"
                className="screenshot-preview-button"
                aria-label={`Open ${app.name} screenshot ${index + 1}`}
                aria-haspopup="dialog"
                onClick={() => setPreviewIndex(index)}
              >
                <Image
                  src={src}
                  alt={images[index].alt}
                  width={app.screenshotDimensions[index].width}
                  height={app.screenshotDimensions[index].height}
                  sizes="(max-width: 720px) 58vw, 220px"
                />
              </button>
            ) : <Image
              src={src}
              alt={`${app.name} app screen ${index + 1}`}
              width={360}
              height={780}
              sizes="(max-width: 640px) 72vw, (max-width: 1100px) 34vw, 260px"
            />}
          </figure>
        ))}
      </div>
      {app.screenshotPreview && (
        <ContentPreviewSlider
          images={images}
          initialIndex={previewIndex ?? 0}
          isOpen={previewIndex !== null}
          onClose={closePreview}
          label={`${app.name} screenshot preview`}
        />
      )}
    </div>
  );
}
