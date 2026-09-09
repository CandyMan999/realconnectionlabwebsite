import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
} from "lucide-react";
import AppLogo from "../components/AppLogo";
import AppPromoMedia from "../components/AppPromoMedia";
import PreviewVideo from "../components/PreviewVideo";
import ScreenshotCarousel from "../components/ScreenshotCarousel";
import StoreLinks from "../components/StoreLinks";
import { apps, company } from "../data/apps";
import { buildAppPageJsonLd, getAppById, jsonLdScript } from "../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({
    appId: app.id,
  }));
}

export async function generateMetadata({ params }) {
  const { appId } = await params;
  const app = getAppById(appId);

  if (!app) {
    return {};
  }

  return {
    title: app.seo.title,
    description: app.seo.description,
    keywords: app.seo.keywords,
    alternates: {
      canonical: app.path,
    },
    openGraph: {
      title: app.seo.title,
      description: app.seo.description,
      url: app.path,
      siteName: company.name,
      type: "website",
      images: [
        {
          url: app.ogImage,
          alt: `${app.name} app screen`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: app.seo.title,
      description: app.seo.description,
      images: [app.ogImage],
    },
  };
}

function AppPreview({ app }) {
  if (app.promoImages) {
    return <AppPromoMedia app={app} priority />;
  }

  if (app.video && app.posterPlayOverlay) {
    return <PreviewVideo app={app} />;
  }

  if (app.video) {
    return (
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
    );
  }

  return (
    <div className="video-frame image-preview">
      <Image
        src={app.poster}
        alt={`${app.name} featured screen`}
        width={430}
        height={936}
        sizes="(max-width: 900px) 76vw, 360px"
        priority
      />
      <div className="video-caption">
        <PlayCircle size={18} aria-hidden="true" />
        <span>{app.previewLabel ?? "Product preview"}</span>
      </div>
    </div>
  );
}

export default async function AppDetailPage({ params }) {
  const { appId } = await params;
  const app = getAppById(appId);

  if (!app) {
    notFound();
  }

  const appPageJsonLd = buildAppPageJsonLd(app);

  return (
    <main className="app-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(appPageJsonLd)}
      />
      <section
        className={`app-detail-hero app-detail-hero-${app.theme}`}
        style={{
          "--accent": app.accent,
          "--accent-alt": app.accentAlt,
        }}
      >
        <div className={`section-inner app-detail-layout${app.promoImages ? " app-layout-with-promo" : ""}`}>
          <div className="app-detail-copy">
            <a className="back-link" href="/">
              <ArrowLeft size={18} aria-hidden="true" />
              All apps
            </a>
            <div className="app-title-row app-detail-title">
              <AppLogo
                app={app}
                className="app-title-logo"
                decorative={false}
                size={78}
              />
              <div>
                <p>{app.eyebrow}</p>
                <h1>{app.displayName ?? app.name}</h1>
              </div>
            </div>
            <p className="app-status">{app.status}</p>
            <p className="app-headline">{app.headline}</p>
            <p className="app-description">{app.longDescription}</p>

            <ul className="feature-list">
              {app.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <StoreLinks app={app} />

            {app.website ? (
              <a
                className="detail-link app-website-link"
                href={app.website}
                target="_blank"
                rel="noreferrer"
              >
                Official app site
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : null}

            <p className="app-disclaimer">{app.disclaimer}</p>
          </div>

          <div className="media-column">
            <AppPreview app={app} />
          </div>
        </div>
      </section>

      <section className="app-detail-content" aria-labelledby={`${app.id}-features`}>
        <div className="section-inner">
          <p className="section-label">{app.name} features</p>
          <h2 id={`${app.id}-features`}>Built for real moments</h2>
          <div className="app-detail-grid">
            {app.detailSections.map((section) => (
              <article className="app-detail-card" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`app-section app-section-${app.theme} app-detail-screens`}
        style={{
          "--accent": app.accent,
          "--accent-alt": app.accentAlt,
        }}
        aria-label={`${app.name} screenshots`}
      >
        <div className="section-inner">
          <ScreenshotCarousel app={app} />
        </div>
      </section>

      <footer className="contact-footer" id="contact">
        <div className="section-inner footer-layout">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>{company.name}</h2>
            <p>
              Building and supporting mobile products for connection,
              accountability, and real-time community.
            </p>
          </div>
          <address>
            <a href={company.phoneHref}>
              <Phone size={20} aria-hidden="true" />
              {company.phone}
            </a>
            <a href={company.emailHref}>
              <Mail size={20} aria-hidden="true" />
              {company.email}
            </a>
            <span>
              <MapPin size={20} aria-hidden="true" />
              {company.address}
            </span>
          </address>
        </div>
      </footer>
    </main>
  );
}
