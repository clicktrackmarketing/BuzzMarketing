import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for The Buzz Marketing Co — how we collect, use, and protect information from visitors to thebuzzmarketingco.com.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const effective = "April 17, 2026";

  return (
    <>
      <JsonLd data={buildBreadcrumbs([{ name: "Privacy Policy", path: "/privacy" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          url: "https://thebuzzmarketingco.com/privacy",
          isPartOf: { "@id": "https://thebuzzmarketingco.com/#website" },
          publisher: { "@id": "https://thebuzzmarketingco.com/#organization" },
        }}
      />
      <section className="bg-buzz-dark pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-buzz-coral mb-4">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-syne-var)] text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">Effective: {effective}</p>
        </div>
      </section>

      <article className="bg-warm-gray py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 prose-buzz text-buzz-slate leading-relaxed space-y-8">
          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              1. Overview
            </h2>
            <p>
              The Buzz Marketing Co (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo;) operates{" "}
              <Link href="/" className="text-buzz-coral hover:underline">
                thebuzzmarketingco.com
              </Link>{" "}
              (the &ldquo;Site&rdquo;). This Privacy Policy explains what
              information we collect, how we use it, how we share it, and the
              choices you have. By using the Site or submitting a form, you
              agree to this policy.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">We collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Information you provide:</strong> name, email, phone
                number, business details, and message content you submit via our
                discovery form, free analysis form, or newsletter signup.
              </li>
              <li>
                <strong>Automatically collected:</strong> device type, browser,
                operating system, referring URL, pages viewed, time on page,
                approximate location (city level), and interaction events.
              </li>
              <li>
                <strong>Cookies and similar technologies:</strong> small files
                stored on your device to remember preferences and measure
                performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              3. Tracking Technologies We Use
            </h2>
            <p className="mb-3">We use the following third-party technologies on this Site:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google Analytics 4 (GA4):</strong> traffic and behavior
                analytics. GA4 may set cookies and process pseudonymous
                identifiers.
              </li>
              <li>
                <strong>Google Tag Manager:</strong> container for loading
                marketing and analytics tags.
              </li>
              <li>
                <strong>PearlDiver / Click Track visitor identification:</strong>{" "}
                resolves a portion of anonymous site visitors to business
                contact data for marketing follow-up. You can request removal
                at any time (see Section 8).
              </li>
              <li>
                <strong>Meta Pixel, Google Ads remarketing, and similar
                advertising tags:</strong> used only when active advertising
                campaigns are running.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              4. How We Use Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries and deliver services you request.</li>
              <li>Improve Site performance, content, and user experience.</li>
              <li>Send marketing communications you&apos;ve opted into.</li>
              <li>Comply with legal obligations and enforce our terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              5. How We Share Information
            </h2>
            <p>
              We do not sell your personal information. We share data only with
              service providers that help us operate the Site (hosting,
              analytics, CRM, email) under contracts requiring confidentiality,
              or when required by law.
            </p>
          </section>

          <section id="sms-terms">
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              6. SMS / Text Messaging Program Terms (A2P 10DLC)
            </h2>
            <p className="mb-3">
              When you provide your mobile number and check the SMS consent
              box on one of our forms, you expressly consent to receive
              marketing and informational text messages from{" "}
              <strong>The Buzz Marketing Co</strong> at the number you
              provided, including messages sent via autodialer. Consent is
              not a condition of any purchase.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Program name:</strong> The Buzz Marketing Co customer
                and prospect notifications.
              </li>
              <li>
                <strong>Types of messages:</strong> appointment and discovery
                call confirmations, follow-ups to inquiries you initiated,
                service updates, promotional offers, and event invitations.
              </li>
              <li>
                <strong>Message frequency:</strong> varies based on your
                engagement — typically 2–8 messages per month.
              </li>
              <li>
                <strong>Cost:</strong> message and data rates may apply
                depending on your wireless carrier and plan.
              </li>
              <li>
                <strong>Opt-out:</strong> reply <strong>STOP</strong> to any
                message to unsubscribe at any time. You will receive one
                confirmation message and no further SMS.
              </li>
              <li>
                <strong>Help:</strong> reply <strong>HELP</strong> for
                assistance, or contact us at{" "}
                <a
                  href="tel:+17203639754"
                  className="text-buzz-coral hover:underline"
                >
                  (720) 363-9754
                </a>
                .
              </li>
              <li>
                <strong>Carrier disclaimer:</strong> carriers are not liable
                for delayed or undelivered messages.
              </li>
              <li>
                <strong>No sharing of mobile opt-in data:</strong> your
                mobile phone number and SMS opt-in information will not be
                shared with third parties or affiliates for marketing
                purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              7. Your Rights (CCPA / GDPR)
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to access,
              correct, delete, or port your personal information, and to opt
              out of certain uses. California residents may also request that
              we disclose categories of information collected. To exercise
              these rights, contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              8. Data Retention & Security
            </h2>
            <p>
              We retain information for as long as necessary to fulfill the
              purposes outlined in this policy. We use commercially reasonable
              safeguards to protect information, but no method of transmission
              or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              9. Contact Us
            </h2>
            <p>
              The Buzz Marketing Co<br />
              San Diego, CA 92101<br />
              Phone:{" "}
              <a href="tel:+17203639754" className="text-buzz-coral hover:underline">
                (720) 363-9754
              </a>
              <br />
              Web:{" "}
              <Link href="/contact" className="text-buzz-coral hover:underline">
                /contact
              </Link>
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The
              &ldquo;Effective&rdquo; date at the top reflects the latest
              revision.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
