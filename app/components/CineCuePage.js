import Image from "next/image";
import { AudioLines, Camera, Focus, ImagePlus, SwitchCamera, Timer, Mic, SlidersHorizontal, Smartphone, ArrowUpRight } from "lucide-react";
import CineCueScreenshots from "./CineCueScreenshots";
import StoreLinks from "./StoreLinks";
import { company } from "../data/apps";
import { buildAppPageJsonLd, jsonLdScript } from "../lib/seo";
import styles from "./CineCuePage.module.css";

const features = [
  [AudioLines, "A script that listens.", "Voice Sync follows your speech, pauses when you pause, and picks back up when you return after going off script. Offline use is supported when on-device speech recognition is available."],
  [Camera, "Every detail. Every take.", "High Res recording with frame rates up to 60 fps. Available resolution and frame rate depend on your iPhone, camera, and selected recording mode."],
  [Focus, "Bring yourself into focus.", "Cinematic depth and background focus effects give your videos a considered look on supported devices. Cinematic capabilities vary separately from High Res recording."],
  [ImagePlus, "Make the scene yours.", "Keep your original camera background, dial in adjustable blur, or choose a custom background image."],
  [SwitchCamera, "Flip without stopping.", "Switch between your front and rear cameras while recording. Keep the story going without ending your take."],
  [Timer, "Room for the whole story.", "Record for up to 30 minutes. From a quick update to a full tutorial, presentation, or YouTube video."],
  [Smartphone, "Vertical. Horizontal. You.", "Go portrait for Reels, TikTok, and Shorts, or landscape for YouTube and longer-form stories."],
  [Mic, "Sound like yourself.", "Connect a compatible external microphone and monitor your audio levels as you record."],
  [SlidersHorizontal, "Find your reading rhythm.", "Adjust font size, overlay opacity, and reading position. Save your finished video to your device for sharing or further editing."],
];

export default function CineCuePage({ app }) {
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(buildAppPageJsonLd(app))} />
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <a href="/" className={styles.back}>← All apps</a>
        <div className={styles.brand}><Image src={app.logo} width={56} height={56} alt="" /><span>CineCue<small>POWERED BY FANLINE</small></span></div>
        <p className={styles.eyebrow}>FREE IPHONE TELEPROMPTER + VIDEO RECORDER</p>
        <h1>CineCue:<br /><em>Teleprompter</em></h1>
        <p className={styles.subtitle}>Cinematic Video &amp; Voice Sync</p>
        <p className={styles.intro}>Look up. Speak naturally. Make your next great take with a teleprompter that keeps up with you.</p>
        <StoreLinks app={app} />
        <p className={styles.note}>FREE app. No watermarks. Watch an ad before downloading each video, or connect an eligible verified FanLine creator account to skip the ads. No separate CineCue account required.</p>
        <a className={styles.textLink} href="#preview">Watch CineCue in action <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <CineCueScreenshots app={app} hero />
    </section>
    <div className={styles.stats} aria-label="CineCue highlights"><span><strong>100% free</strong>For every creator</span><span><strong>No watermarks</strong>Your video stays yours</span><span><strong>Up to 30 min</strong>Space to tell your story</span></div>
    <section className={styles.section} id="preview"><div className={styles.sectionHeading}><p className={styles.eyebrow}>FROM SCRIPT TO SCREEN</p><h2>Less juggling.<br />More creating.</h2><p>Your script, camera, and creative controls. Together on your iPhone.</p></div><div className={styles.video}><video controls playsInline preload="none" poster="/assets/cineQue/appStoreFront/store2.png" aria-label="CineCue promotional preview"><source src={app.video} type="video/mp4" /></video></div></section>
    <section className={styles.section} aria-labelledby="cinecue-features"><p className={styles.eyebrow}>READY WHEN INSPIRATION HITS</p><h2 id="cinecue-features">Built around your flow.</h2><div className={styles.grid}>{features.map(([Icon, title, body]) => <article className={styles.card} key={title}><Icon aria-hidden="true" size={25} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className={styles.gallerySection} aria-label="CineCue app screenshots"><CineCueScreenshots app={app} /><p className={styles.note}>Tap a screenshot to preview · Swipe to explore</p></section>
    <section className={`${styles.section} ${styles.fanline}`}><div><p className={styles.eyebrow}>FREE FOR EVERYONE. A LITTLE EXTRA FOR FANLINE CREATORS.</p><h2>Your next take<br />starts here.</h2><p>CineCue is free, with no watermarks and no separate account to create. Unless you connect an eligible verified FanLine creator account, you must watch an ad before downloading each video. These ads are promotional videos for our own products. These are not third-party advertising-network placements.</p><p>Eligible verified FanLine creators with completed profiles can optionally connect their existing FanLine account to save without those promotional videos. A FanLine account is never required for basic use.</p><a className={styles.textLink} href="/fanline">Explore FanLine <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className={styles.freeCard}><span>CREATE WITHOUT LIMITING YOUR VOICE</span><strong>Free.<br />No watermarks.</strong><StoreLinks app={app} /><p className={styles.note}>Recording capabilities vary by device and mode.</p></div></section>
    <footer className={styles.footer}><a href="/cinecue">CineCue <span>by {company.name}</span></a><nav aria-label="CineCue resources"><a href="/cinecue/privacy">Privacy Policy</a><a href={`${company.emailHref}?subject=CineCue%20Support`}>Support</a><a href="/">All apps</a></nav></footer>
  </main>;
}
