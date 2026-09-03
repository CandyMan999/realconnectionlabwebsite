import { apps, company } from "../data/apps";

export function absoluteUrl(path = "/") {
  return new URL(path, company.url).toString();
}

export function getAppById(id) {
  return apps.find((app) => app.id === id);
}

export function getActiveAppLinks(app) {
  return app.links
    .filter((link) => link.href && !link.disabled && link.kind !== "privacy")
    .map((link) => link.href);
}

export function getAppSameAs(app) {
  return [app.website, ...getActiveAppLinks(app)].filter(Boolean);
}

export function jsonLdScript(value) {
  return {
    __html: JSON.stringify(value).replace(/</g, "\\u003c"),
  };
}

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${company.url}/#organization`,
  name: company.name,
  url: company.url,
  logo: absoluteUrl("/assets/realConnectionLabLogo.png"),
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.addressLocality,
    addressRegion: company.addressRegion,
    postalCode: company.postalCode,
    addressCountry: company.country,
  },
  sameAs: apps.flatMap((app) => getAppSameAs(app)),
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${company.url}/#website`,
  name: company.name,
  url: company.url,
  publisher: {
    "@id": `${company.url}/#organization`,
  },
};

export function buildAppJsonLd(app) {
  const downloadUrls = getActiveAppLinks(app);

  return {
    "@type": "MobileApplication",
    "@id": `${absoluteUrl(app.path)}#app`,
    name: app.storeName ?? app.name,
    alternateName: app.name,
    description: app.seo.description,
    url: absoluteUrl(app.path),
    image: absoluteUrl(app.logo),
    screenshot: app.screenshots.map((screenshot) => absoluteUrl(screenshot)),
    applicationCategory: app.schemaCategory,
    operatingSystem: app.platforms.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@id": `${company.url}/#organization`,
    },
    downloadUrl: downloadUrls,
    sameAs: getAppSameAs(app),
  };
}

export function buildHomepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      websiteJsonLd,
      {
        "@type": "ItemList",
        "@id": `${company.url}/#apps`,
        name: "Real Connection Lab mobile apps",
        itemListElement: apps.map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(app.path),
          item: {
            "@id": `${absoluteUrl(app.path)}#app`,
            name: app.name,
          },
        })),
      },
      ...apps.map((app) => buildAppJsonLd(app)),
    ],
  };
}

export function buildAppPageJsonLd(app) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      buildAppJsonLd(app),
      {
        "@type": "BreadcrumbList",
        "@id": `${absoluteUrl(app.path)}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: company.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: app.name,
            item: absoluteUrl(app.path),
          },
        ],
      },
    ],
  };
}
