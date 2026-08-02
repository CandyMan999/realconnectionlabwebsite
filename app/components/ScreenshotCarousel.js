"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function ScreenshotCarousel({ app }) {
  const railRef = useRef(null);

  function scrollByCard(direction) {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const card = rail.querySelector(".screenshot-frame");
    const distance = card ? card.getBoundingClientRect().width + 18 : 320;

    rail.scrollBy({
      left: direction * distance,
      behavior: "smooth"
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
          <figure className="screenshot-frame" key={src}>
            <Image
              src={src}
              alt={`${app.name} app screen ${index + 1}`}
              width={360}
              height={780}
              sizes="(max-width: 640px) 72vw, (max-width: 1100px) 34vw, 260px"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
