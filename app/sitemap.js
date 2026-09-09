import { apps, company } from "./data/apps";

const staticRoutes = [
  {
    path: "/rise-again/privacy",
    lastModified: "2026-09-09",
    changeFrequency: "yearly",
    priority: 0.45,
  },
  {
    path: "/",
    lastModified: "2026-09-09",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/myxer/privacy",
    lastModified: "2026-08-25",
    changeFrequency: "yearly",
    priority: 0.45,
  },
];

export default function sitemap() {
  const appRoutes = apps.map((app) => ({
    path: app.path,
    lastModified: app.lastModified,
    changeFrequency: app.sitemapChangeFrequency,
    priority: app.sitemapPriority,
  }));

  return [...staticRoutes, ...appRoutes].map((route) => ({
    url: `${company.url}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
