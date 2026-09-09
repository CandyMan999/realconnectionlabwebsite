"use client";

import { PlayCircle } from "lucide-react";
import { useRef } from "react";
import PhoneCarousel from "./PhoneCarousel";

export default function AppPromoMedia({ app, priority = false }) {
  const videoRef = useRef(null);

  return (
    <div className="app-promo-media">
      <PhoneCarousel app={app} priority={priority} />
      {app.video && (
        <details
          className="app-promo-video"
          onToggle={(event) => {
            if (!event.currentTarget.open) videoRef.current?.pause();
          }}
        >
          <summary>
            <PlayCircle size={18} aria-hidden="true" />
            Watch app preview
          </summary>
          <video
            ref={videoRef}
            controls
            playsInline
            preload="none"
            poster={app.poster}
            aria-label={`${app.name} preview video`}
          >
            <source src={app.video} type="video/mp4" />
          </video>
        </details>
      )}
    </div>
  );
}
