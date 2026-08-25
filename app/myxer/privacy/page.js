import { Mail, ShieldCheck } from "lucide-react";
import { company } from "../../data/apps";

export const metadata = {
  title: "Myxer Privacy Policy | Real Connection Lab LLC",
  description:
    "Privacy Policy for Myxer, the live video speed dating app from Real Connection Lab LLC.",
};

export default function MyxerPrivacyPolicy() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a className="brand-mark" href="/" aria-label="Real Connection Lab home">
          <span>RC</span>
          <strong>{company.name}</strong>
        </a>
        <nav aria-label="Privacy page navigation">
          <a href="https://realconnectionlabllc.com/#myxer">Myxer</a>
          <a href={company.emailHref}>Contact</a>
        </nav>
      </header>

      <section className="legal-hero">
        <div className="section-inner legal-hero-inner">
          <p className="legal-eyebrow">
            <ShieldCheck size={18} aria-hidden="true" />
            Myxer
          </p>
          <h1>Privacy Policy</h1>
          <p>
            Last updated: August 25, 2026
          </p>
        </div>
      </section>

      <section className="legal-content">
        <div className="section-inner legal-copy">
          <p>
            This Privacy Policy explains how {company.name} collects, uses,
            shares, and protects information when you use Myxer, our live video
            speed dating app, related websites, support channels, and other
            services that link to this policy.
          </p>

          <h2>Who We Are</h2>
          <p>
            Myxer is operated by {company.name}, a United States company based
            in Texas. You can contact us at{" "}
            <a href={company.emailHref}>{company.email}</a>.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly, including your name,
            email address, profile details, photos, videos, messages, support
            requests, preferences, and any other content you choose to add to
            Myxer.
          </p>
          <p>
            We collect information needed to run dating, matching, chatroom,
            video, map, safety, and account features. This can include your
            approximate or precise location, device identifiers, user ID, app
            activity, diagnostics, crash data, performance data, and purchase or
            entitlement information handled through Apple or other app stores.
          </p>
          <p>
            Myxer is designed for real-time interaction. Other users may see
            profile information, photos, videos, chatroom messages, availability,
            and live video or message content you choose to share in the app.
          </p>

          <h2>How We Use Information</h2>
          <p>
            We use information to create and secure accounts, show profiles,
            support matching and chatrooms, provide live video speed dating,
            process app features, deliver notifications, respond to support
            requests, troubleshoot bugs, measure performance, prevent fraud and
            abuse, enforce our rules, and comply with law.
          </p>
          <p>
            We may use automated and manual safety tools to help detect
            inappropriate content, scams, bots, harassment, or other conduct that
            can harm the Myxer community.
          </p>

          <h2>Location</h2>
          <p>
            Location can help Myxer show local matches and map-based discovery.
            We use location only for app functionality, safety, and improving the
            service. Where Myxer displays nearby discovery, we may use privacy
            protections such as location offsets so your exact location is not
            shown to other users.
          </p>

          <h2>Sharing Information</h2>
          <p>
            We do not sell your personal information. We share information only
            as needed to operate Myxer, including with service providers that
            help us with hosting, storage, analytics, crash reporting, app
            security, content moderation, communications, video features,
            payments, and customer support.
          </p>
          <p>
            We may also disclose information if required by law, to protect the
            rights and safety of users or the public, to investigate abuse or
            fraud, or as part of a merger, acquisition, financing, or sale of
            business assets.
          </p>

          <h2>Your Choices</h2>
          <p>
            You can review and update your profile information in the app. You
            can control device permissions such as location, camera, microphone,
            notifications, and photos through your device settings. Some features
            may not work if required permissions are disabled.
          </p>
          <p>
            You may request access, correction, or deletion of your personal
            information by contacting us at{" "}
            <a href={company.emailHref}>{company.email}</a>. We may need to keep
            limited information when required for legal, safety, fraud
            prevention, accounting, dispute resolution, or security purposes.
          </p>

          <h2>Data Retention</h2>
          <p>
            We keep information for as long as needed to provide Myxer, maintain
            security, comply with legal obligations, resolve disputes, and
            enforce our agreements. When information is no longer needed, we
            delete it or de-identify it where reasonably possible.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational
            safeguards designed to protect information. No internet or mobile app
            service can be guaranteed to be completely secure, so please use good
            judgment when sharing personal details with other users.
          </p>

          <h2>Children and Age Limits</h2>
          <p>
            Myxer is intended for adults. The app is not directed to children,
            and users must meet the age requirements shown in the app store and
            within the app. If you believe a minor has provided information to
            us, contact us so we can review and take appropriate action.
          </p>

          <h2>U.S. State Privacy Rights</h2>
          <p>
            Depending on where you live, you may have rights to request access,
            deletion, correction, portability, or restriction of certain personal
            information. You may also have the right to appeal a privacy request
            decision. To exercise these rights, email us at{" "}
            <a href={company.emailHref}>{company.email}</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make
            material changes, we will update the date above and may provide
            additional notice in the app or on our website.
          </p>

          <h2>Contact Us</h2>
          <p>
            For privacy questions or requests, contact:
          </p>
          <p className="legal-contact">
            <Mail size={18} aria-hidden="true" />
            <a href={company.emailHref}>{company.email}</a>
          </p>
          <p>
            {company.name}
            <br />
            {company.address}
          </p>
        </div>
      </section>
    </main>
  );
}
