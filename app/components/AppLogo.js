import Image from "next/image";

export default function AppLogo({
  app,
  className = "",
  decorative = true,
  size = 40,
}) {
  if (app.logo) {
    return (
      <Image
        className={className}
        src={app.logo}
        alt={decorative ? "" : `${app.name} logo`}
        width={size}
        height={size}
      />
    );
  }

  const generatedClassName = ["app-generated-logo", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={generatedClassName}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : `${app.name} logo`}
      role={decorative ? undefined : "img"}
    >
      {app.logoText ?? app.name.slice(0, 2)}
    </span>
  );
}
