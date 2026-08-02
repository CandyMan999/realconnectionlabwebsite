import Image from "next/image";
import { ArrowDown, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import AppShowcase from "./components/AppShowcase";
import { apps, company } from "./data/apps";

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="Real Connection Lab home">
          <span>RC</span>
          <strong>{company.name}</strong>
        </a>
        <nav>
          {apps.map((app) => (
            <a href={`#${app.id}`} key={app.id}>
              {app.name}
            </a>
          ))}
        </nav>
        <a className="header-phone" href={company.phoneHref}>
          <Phone size={17} aria-hidden="true" />
          {company.phone}
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-visual" aria-hidden="true">
          <Image
            className="hero-shot hero-shot-one"
            src="/assets/fanline/screenShot1.PNG"
            alt=""
            width={310}
            height={674}
            priority
          />
          <Image
            className="hero-shot hero-shot-two"
            src="/assets/soberMotivation/screenShot1.png"
            alt=""
            width={310}
            height={674}
            priority
          />
          <Image
            className="hero-shot hero-shot-three"
            src="/assets/wine&dime/screenShot1.png"
            alt=""
            width={310}
            height={674}
            priority
          />
        </div>

        <div className="section-inner hero-content">
          <p className="eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            Mobile apps built around real connection
          </p>
          <h1>
            <span>Real</span>
            <span>Connection</span>
            <span>Lab LLC</span>
          </h1>
          <p className="hero-copy">
            We build social, recovery, and dating apps that bring people into live,
            human moments: a fan call, a sober check-in, or a video-first date.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href={company.phoneHref}>
              <Phone size={19} aria-hidden="true" />
              Call {company.phone}
            </a>
            <a className="secondary-action" href="#apps">
              Explore apps
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="app-jump-list" id="apps" aria-label="App sections">
            {apps.map((app) => (
              <a
                className={`jump-link jump-link-${app.theme}`}
                href={`#${app.id}`}
                key={app.id}
                style={{ "--accent": app.accent, "--accent-alt": app.accentAlt }}
              >
                <Image src={app.logo} alt="" width={40} height={40} />
                <span>
                  <strong>{app.name}</strong>
                  <small>{app.eyebrow}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="company-section" aria-labelledby="company-overview">
        <div className="section-inner company-layout">
          <div>
            <p className="section-label">Company Overview</p>
            <h2 id="company-overview">Independent mobile software studio</h2>
          </div>
          <div className="company-copy">
            <p>
              Real Connection Lab LLC is a Texas-based software company focused on
              building and operating consumer mobile applications. Our products are
              designed around live interaction, personal accountability, community
              safety, and practical tools people can use in everyday moments.
            </p>
            <p>
              The company manages product design, mobile app development, app store
              distribution, user support, privacy documentation, safety workflows,
              and ongoing maintenance for the apps represented on this site.
            </p>
            <div className="company-points" aria-label="Company capabilities">
              <span>Mobile app development</span>
              <span>Consumer software operations</span>
              <span>Privacy and safety support</span>
              <span>App Store and Google Play distribution</span>
            </div>
          </div>
        </div>
      </section>

      {apps.map((app, index) => (
        <AppShowcase app={app} index={index} key={app.id} />
      ))}

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
