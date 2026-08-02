import { SiAppstore } from "react-icons/si";

function GooglePlayIcon() {
  return (
    <svg
      className="google-play-icon"
      viewBox="0 0 36 40"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#34a853" d="M2.1 1.1 22 20 2.1 38.9A4 4 0 0 1 0 35.4V4.6a4 4 0 0 1 2.1-3.5Z" />
      <path fill="#4285f4" d="m2.1 1.1 24.6 14.2L22 20Z" />
      <path fill="#fbbc04" d="m22 20 4.7 4.7L2.1 38.9Z" />
      <path fill="#ea4335" d="m26.7 15.3 6.7 3.9a.9.9 0 0 1 0 1.6l-6.7 3.9L22 20Z" />
    </svg>
  );
}

function TestFlightIcon() {
  return (
    <svg
      className="testflight-icon"
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="44" height="44" rx="10" fill="#0a84ff" />
      <circle cx="22" cy="22" r="14.5" fill="none" stroke="#ffffff" strokeWidth="2.4" />
      <path
        fill="#ffffff"
        d="M22 8.8c2.6 4 2.3 8.1.1 10.4-2.3-2.3-2.6-6.4-.1-10.4ZM9.4 25.7c4.7-.3 8.1 2 8.9 5.1-3.1.8-6.9-1-8.9-5.1ZM34.6 25.7c-2 4.1-5.8 5.9-8.9 5.1.8-3.1 4.2-5.4 8.9-5.1Z"
      />
      <circle cx="22" cy="22" r="3.7" fill="#ffffff" />
    </svg>
  );
}

function getBadgeContent(link) {
  if (link.kind === "appstore") {
    return {
      Icon: SiAppstore,
      eyebrow: link.disabled ? "Coming soon on the" : "Download on the",
      title: "App Store"
    };
  }

  if (link.kind === "googleplay") {
    return {
      Icon: GooglePlayIcon,
      eyebrow: link.disabled ? "Coming soon on" : "GET IT ON",
      title: "Google Play"
    };
  }

  if (link.kind === "testflight") {
    return {
      Icon: TestFlightIcon,
      eyebrow: "Join the beta on",
      title: "TestFlight"
    };
  }

  return {
    Icon: TestFlightIcon,
    eyebrow: "Open",
    title: link.label
  };
}

export default function StoreButton({ link }) {
  const { Icon, eyebrow, title } = getBadgeContent(link);
  const className = [
    "store-button",
    `store-button-${link.kind}`,
    link.disabled ? "store-button-disabled" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <Icon size={26} aria-hidden="true" />
      <span className="store-button-text">
        <small>{eyebrow}</small>
        <strong>{title}</strong>
      </span>
    </>
  );

  if (link.disabled) {
    return (
      <span className={className} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a
      className={className}
      href={link.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${link.label} opens in a new tab`}
    >
      {content}
    </a>
  );
}
