import { company } from "../../data/apps";

export const metadata = {
  title: "CineCue Privacy Policy",
  description: "How CineCue handles scripts, recordings, Voice Sync, optional FanLine verification, and website information.",
  alternates: { canonical: "/cinecue/privacy" },
  openGraph: { title: "CineCue Privacy Policy", url: "/cinecue/privacy", type: "website" },
};

export default function CineCuePrivacy() {
  return <main className="legal-page">
    <section className="legal-hero"><div className="section-inner legal-hero-inner"><a href="/cinecue">← CineCue</a><h1>Privacy Policy</h1><p>Last updated: September 16, 2026</p></div></section>
    <section className="legal-content"><div className="section-inner legal-copy">
      <p>This policy explains how {company.name} handles information through CineCue, our iPhone teleprompter and video recorder powered by FanLine, and its promotional pages on this website. For privacy questions, contact <a href={company.emailHref}>{company.email}</a>.</p>
      <h2>Free recording, without a separate account</h2>
      <p>Everyone can use CineCue for free without creating a CineCue account. CineCue does not provide a public social feed, messaging, or automatic public distribution of recordings. Standard users see our own product promotional videos before saving. Eligible verified FanLine creators with completed profiles may optionally verify their existing account to save without those promotions.</p>
      <h2>Scripts, recordings, and images on your device</h2>
      <p>Your current script and teleprompter settings are held in app memory. CineCue uses the script to display your words and match speech for Voice Sync. The current script is not a cloud-saved document. Camera recording, trimming, color adjustments, and background effects run on your device. CineCue does not automatically upload your scripts, recorded videos, or selected background images to our servers.</p>
      <p>Recording backups and related metadata are stored in CineCue’s private documents storage. Capture and export operations also create files in app cache and temporary storage. A custom background is copied into the app’s documents storage; its selection and image metadata are saved locally so it can be restored later. Operating-system backup and restore settings may affect these local files.</p>
      <p>When you tap Paste, the app reads clipboard text. It may also check clipboard text following a bulk insertion in the script editor to recognize and format pasted content. This text is used locally for your script.</p>
      <h2>Permissions and Voice Sync</h2>
      <ul>
        <li><strong>Camera:</strong> preview and record video.</li>
        <li><strong>Microphone:</strong> record audio, use compatible external microphones, monitor levels, and follow speech.</li>
        <li><strong>Speech recognition:</strong> recognize spoken words for Voice Sync.</li>
        <li><strong>Photos:</strong> choose a background through the system image picker, which provides access to the selected image without requiring broad library access. Saving requests add-only photo-library permission on iPhone.</li>
      </ul>
      <p>Granting a device permission does not by itself upload your content to us. Voice Sync prefers on-device speech recognition and supports offline use when that recognition is available. It is not guaranteed to remain offline: if local recognition is unavailable or encounters certain failures, the app can use the system’s network speech-recognition service. Audio may then be sent to Apple for processing. See <a href="https://www.apple.com/legal/privacy/data/en/ask-siri-dictation/">Apple’s speech-recognition privacy information</a>. Use manual scrolling and disable speech-recognition permission if you do not want this processing.</p>
      <h2>Optional FanLine creator verification</h2>
      <p>If you choose email verification, CineCue sends your FanLine email and password over HTTPS to FanLine. If you choose Sign in with Apple, it sends the Apple identity token instead. The FanLine backend authenticates the request and checks existing account status, creator role, verification, and profile completion, including whether the account is deleted or banned.</p>
      <p>FanLine returns an eligibility result and, when relevant, a reason access was not granted. This verification does not create a new FanLine account or server login session. CineCue does not persist your password or Apple identity token, receive a persistent FanLine session token, or download your FanLine profile. Promotional-video-free eligibility is kept in memory for the current app session.</p>
      <p>There is no persistent CineCue account connection to disconnect. Fully closing and relaunching CineCue resets the session benefit; you can continue without verifying. This does not revoke your Apple sign-in authorization or delete your existing FanLine account. Manage those separately through Apple’s account settings and FanLine, or contact our support for account-related requests.</p>
      <h2>Promotional videos and network information</h2>
      <p>Our promotional videos are streamed from a content-delivery service at cdn.sobermotivation.app. They promote our products and are not placements from a third-party advertising network. The app chooses from its configured videos without using your scripts, recordings, or background images to target promotions. The current flow does not request an advertising identifier.</p>
      <p>The video-delivery service and FanLine backend receive connection information, including your IP address and request details, when handling requests. Hosting infrastructure may retain access, security, or error logs. These requests are separate from locally processing your recordings. The app does not set a retention period for infrastructure logs; contact us for questions about server-side records.</p>
      <h2>Diagnostics, saving, and sharing</h2>
      <p>CineCue writes local technical diagnostics for recording and export troubleshooting, such as timing, capture settings, resource information, and error codes. Diagnostic files rotate at size limits and are not automatically uploaded by CineCue. The current app does not integrate a third-party analytics or crash-reporting SDK.</p>
      <p>When you save, a video is added to your Photos library. When you share, the system share sheet passes the file to the destination you choose. Photos cloud syncing and those destinations follow their own settings and privacy practices. A successful save may trigger an optional native App Store review prompt; Apple handles any review you submit.</p>
      <h2>Retention and deletion choices</h2>
      <ul>
        <li>Use Clear in the script editor to remove the current script.</li>
        <li>Delete a local recording from Recordings. Starting a new recording also clears previous app-managed recording backups and temporary recording files during preparation. Save videos you want to keep to Photos first.</li>
        <li>Remove a custom background in Settings. Replacing or removing it also attempts to delete the previous app-owned image copy.</li>
        <li>Revoke camera, microphone, speech-recognition, or Photos permissions in iPhone Settings. Features requiring those permissions will no longer work.</li>
        <li>Deleting CineCue removes its local app data, subject to device backup and restore settings. Offloading the app is different and can preserve app data.</li>
        <li>Delete exported videos, original background photos, cloud copies, and files shared elsewhere separately. Deleting CineCue does not delete your FanLine account.</li>
      </ul>
      <p>For access, correction, or deletion requests concerning support correspondence or server-side information, email <a href={company.emailHref}>{company.email}</a> and identify CineCue or the relevant FanLine account. Do not send passwords or authentication tokens. We may need information to verify the request. Applicable legal or security requirements may affect what can be deleted. CineCue cannot remotely erase files stored only on your device or in destinations you chose.</p>
      <h2>This promotional website</h2>
      <p>These promotional pages do not include an analytics SDK, advertising pixel, contact form, or application-set tracking cookies. Screenshots and preview videos are served by this website. Our hosting infrastructure receives normal web-request information, such as IP addresses, requested URLs, browser information, and request times, and may retain operational or security logs.</p>
      <p>Support links open your email application. If you email us, we receive your address, message, and any attachments you send, which we use to handle your request. App Store and other external links take you to services with their own privacy practices.</p>
      <h2>Security and updates</h2>
      <p>CineCue uses operating-system app storage and permissions, and HTTPS for creator verification and promotional-video delivery. No storage or transmission method is completely secure. We will revise this policy and its date when our practices change.</p>
      <h2>Contact</h2>
      <p>{company.name}<br />{company.address}<br /><a href={company.emailHref}>{company.email}</a></p>
      <p><a href="/cinecue">Return to CineCue</a></p>
    </div></section>
  </main>;
}
