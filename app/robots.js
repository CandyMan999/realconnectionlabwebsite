import { company } from "./data/apps";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
