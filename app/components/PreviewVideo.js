"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

export default function PreviewVideo({ app }) {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  function playVideo() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setHasStarted(true);
    video.controls = true;
    video.play().catch(() => {
      video.controls = false;
      setHasStarted(false);
    });
  }

  return (
    <div className="video-frame preview-video-frame">
      <video
        ref={videoRef}
        controls={hasStarted}
        playsInline
        preload="metadata"
        poster={app.poster}
        aria-label={`${app.name} preview video`}
      >
        <source src={app.video} type="video/mp4" />
      </video>
      {!hasStarted ? (
        <button
          className="preview-play-overlay"
          type="button"
          onClick={playVideo}
          aria-label={`Play ${app.name} preview video`}
        >
          <span>
            <Play size={34} fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      ) : null}
    </div>
  );
}
