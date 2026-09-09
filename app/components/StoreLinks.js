import StoreButton from "./StoreButton";

export default function StoreLinks({ app }) {
  const downloads = [
    ...app.links.filter((link) => link.kind === "appstore"),
    ...app.links.filter((link) => link.kind === "googleplay"),
    ...app.links.filter(
      (link) => !["appstore", "googleplay", "privacy"].includes(link.kind)
    ),
  ];
  const privacyLinks = app.links.filter((link) => link.kind === "privacy");

  return (
    <div className="store-links">
      <div className="store-downloads" aria-label={`${app.name} download links`}>
        {downloads.map((link) => (
          <StoreButton link={link} key={link.label} />
        ))}
      </div>
      {privacyLinks.length > 0 ? (
        <div className="store-privacy">
          {privacyLinks.map((link) => (
            <StoreButton link={link} key={link.label} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
