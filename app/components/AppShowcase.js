import Image from "next/image";
import { PlayCircle } from "lucide-react";
import ScreenshotCarousel from "./ScreenshotCarousel";
import StoreButton from "./StoreButton";

export default function AppShowcase({ app, index }) {
  return (
    <section
      className={`app-section app-section-${app.theme}`}
      id={app.id}
      style={{
        "--accent": app.accent,
        "--accent-alt": app.accentAlt
      }}
    >
      <div className="section-inner app-layout">
        <div className="app-copy">
          <div className="app-title-row">
            <Image
              className="app-title-logo"
              src={app.logo}
              alt={`${app.name} logo`}
              width={72}
              height={72}
            />
            <div>
              <h2>{app.name}</h2>
              <p>{app.eyebrow}</p>
            </div>
          </div>
          <p className="app-status">{app.status}</p>
          <p className="app-headline">{app.headline}</p>
          <p className="app-description">{app.description}</p>

          <ul className="feature-list">
            {app.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="store-row" aria-label={`${app.name} download links`}>
            {app.links.map((link) => (
              <StoreButton link={link} key={link.label} />
            ))}
          </div>
        </div>

        <div className="media-column">
          {app.video ? (
            <div className="video-frame">
              <video
                controls
                playsInline
                preload="metadata"
                poster={app.poster}
                aria-label={`${app.name} preview video`}
              >
                <source src={app.video} type="video/mp4" />
              </video>
              <div className="video-caption">
                <PlayCircle size={18} aria-hidden="true" />
                <span>Preview video</span>
              </div>
            </div>
          ) : (
            <div className="video-frame image-preview">
              <Image
                src={app.poster}
                alt={`${app.name} featured screen`}
                width={430}
                height={936}
                sizes="(max-width: 900px) 76vw, 360px"
                priority={index === 0}
              />
              <div className="video-caption">
                <PlayCircle size={18} aria-hidden="true" />
                <span>Preview assets coming soon</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="section-inner">
        <ScreenshotCarousel app={app} />
      </div>
    </section>
  );
}
