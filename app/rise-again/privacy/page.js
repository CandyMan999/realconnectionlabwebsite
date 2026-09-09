import { ShieldCheck } from "lucide-react";
import { company } from "../../data/apps";

export const metadata = {
  title: "Rise Again: Quit Drinking Privacy Policy",
  description:
    "Privacy Policy for Rise Again: Quit Drinking, the sobriety support app from Real Connection Lab LLC.",
  alternates: {
    canonical: "/rise-again/privacy",
  },
  openGraph: {
    title: "Rise Again: Quit Drinking Privacy Policy | Real Connection Lab LLC",
    description:
      "Privacy Policy for Rise Again: Quit Drinking, the sobriety support app from Real Connection Lab LLC.",
    url: "/rise-again/privacy",
    siteName: company.name,
    type: "website",
  },
};

export default function RiseAgainPrivacyPolicy() {
  return (
    <main className="legal-page">
      <section className="legal-hero">
        <div className="section-inner legal-hero-inner">
          <p className="legal-eyebrow">
            <ShieldCheck size={18} aria-hidden="true" />
            Rise Again: Quit Drinking
          </p>
          <h1>Privacy Policy</h1>
          <p>
            Last updated: September 9, 2026
          </p>
        </div>
      </section>

      <section className="legal-content">
        <div className="section-inner legal-copy">
          <h2>Introduction</h2>

          <p>
            Rise Again: Quit Drinking (“we,” “our,” or “us”) is a mobile application designed to
            support individuals on their sobriety journey through motivation,
            tracking tools, community interaction, and optional notifications. Your
            privacy is important to us, and this Privacy Policy explains how we
            collect, use, store, and protect your information when you use the Rise Again: Quit Drinking app (the “Service”).
          </p>

          <p>
            By using the Service, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <ul>
            <li>
              <strong>Account Information:</strong> When you create an account, we may
              collect a username, profile information, and authentication details
              (such as Apple sign-in identifiers).
            </li>
            <li>
              <strong>Sobriety Data:</strong> Information such as sobriety start dates,
              streaks, milestones, relapse tracking, and personal reflections that
              you choose to enter.
            </li>
            <li>
              <strong>Optional Social Information:</strong> Optional social handles or
              profile details you choose to share for personalization or community
              interaction.
            </li>
            <li>
              <strong>User-Generated Content:</strong> Posts, comments, messages, or
              other content you voluntarily submit within the app.
            </li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <ul>
            <li>
              <strong>Device & Usage Information:</strong> We may collect information
              about your device, app interactions, and usage patterns to improve app
              performance and user experience.
            </li>
            <li>
              <strong>Notifications:</strong> If you enable notifications, we collect
              information necessary to send push notifications related to sobriety
              milestones, reminders, or community activity.
            </li>
          </ul>

          <h3>Location Information (Optional)</h3>
          <ul>
            <li>
              <strong>Optional Location Services:</strong> With your explicit consent,
              the app may use location data (including background location) to detect
              proximity to bars or liquor stores in order to send supportive,
              sobriety-focused notifications.
            </li>
            <li>
              Location data is not used for advertising or sold to third parties and
              can be disabled at any time in your device or app settings.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>

          <ul>
            <li>
              To provide and maintain core app functionality, including sobriety
              tracking and milestones.
            </li>
            <li>
              To personalize content, reminders, and motivational messages.
            </li>
            <li>
              To enable community features such as posts, comments, and interactions.
            </li>
            <li>
              To send optional push notifications you choose to receive.
            </li>
            <li>
              To improve app performance, reliability, and user experience.
            </li>
            <li>
              To ensure safety, moderation, and compliance with app policies.
            </li>
          </ul>

          <h2>Subscriptions & Monetization</h2>

          <p>
            Rise Again: Quit Drinking may offer optional paid subscriptions or in-app purchases
            that unlock premium features. Payments are processed securely through
            Apple’s App Store or Google Play, and we do not store your payment
            information.
          </p>

          <p>
            Subscription status may be used to determine feature access within the
            app.
          </p>

          <h2>Advertising</h2>

          <p>
            The app may display advertisements for free users. Advertising partners
            may use limited device information to deliver ads in accordance with their
            own privacy policies. We do not sell personal sobriety data or private user
            content to advertisers.
          </p>

          <h2>Data Sharing</h2>

          <p>
            We do not sell your personal data. We may share limited information only
            in the following circumstances:
          </p>

          <ul>
            <li>
              With trusted service providers who help operate the app (such as
              hosting, analytics, or notification services).
            </li>
            <li>
              If required by law, legal process, or to protect the rights and safety
              of users or others.
            </li>
            <li>
              In connection with a business transfer, merger, or acquisition.
            </li>
          </ul>

          <h2>Data Security</h2>

          <p>
            We use reasonable technical and organizational safeguards to protect your
            information. However, no system is completely secure, and we cannot
            guarantee absolute security of your data.
          </p>

          <h2>Your Choices & Controls</h2>

          <ul>
            <li>
              You may edit your account information within the app.
            </li>
            <li>
              You can enable or disable notifications at any time.
            </li>
            <li>
              You can enable or disable location access in your device settings.
            </li>
            <li>
              <strong>Delete your account:</strong> You can delete your Rise Again: Quit Drinking
              account directly in the app by going to <strong>Edit Profile</strong> and
              tapping the <strong>Delete Account</strong> button at the bottom of the screen.
              This will permanently delete your account and associated data from our systems,
              subject to any legal requirements.
            </li>
          </ul>

          <h2>Children’s Privacy</h2>

          <p>
            Rise Again: Quit Drinking is not intended for children under the age of 13. We do
            not knowingly collect personal information from children. If we become
            aware that such data has been collected, we will delete it promptly.
          </p>

          <h2>Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time. Any changes will be
            posted within the app or on our website, and the “Last updated” date will
            be revised accordingly.
          </p>

          <h2>Contact Us</h2>

          <p>
            If you have questions or concerns about this Privacy Policy or your data,
            please contact us at:
          </p>

          <p>
            Email:
            <a href="mailto:support@sobermotivation.com">
              support@sobermotivation.com
            </a>
          </p>

          <p><em>By using the Rise Again: Quit Drinking app, you agree to this Privacy Policy.</em></p>
        </div>
      </section>
    </main>
  );
}
