import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing use of thebuzzmarketingco.com and the services of The Buzz Marketing Co.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const effective = "April 16, 2026";

  return (
    <>
      <JsonLd data={buildBreadcrumbs([{ name: "Terms of Service", path: "/terms" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          url: "https://thebuzzmarketingco.com/terms",
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
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">Effective: {effective}</p>
        </div>
      </section>

      <article className="bg-warm-gray py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-buzz-slate leading-relaxed space-y-8">
          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using{" "}
              <Link href="/" className="text-buzz-coral hover:underline">
                thebuzzmarketingco.com
              </Link>{" "}
              (the &ldquo;Site&rdquo;) or engaging The Buzz Marketing Co
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;) for services, you agree to
              these Terms of Service. If you do not agree, do not use the Site
              or our services.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              2. Services
            </h2>
            <p>
              We provide marketing strategy, social media management, content
              production, paid media, SEO, and related services. Engagements
              are governed by a separate written proposal or statement of work
              that controls in the event of conflict with these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              3. No Guaranteed Results
            </h2>
            <p>
              Marketing outcomes depend on many factors outside our control
              (competition, market conditions, client product/offer,
              operations). Any metrics, timeframes, or benchmarks referenced on
              this Site are illustrative examples and not a guarantee of
              results for any specific business.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              4. Intellectual Property
            </h2>
            <p>
              All content on this Site, including copy, graphics, logos,
              photography, and code, is owned by The Buzz Marketing Co or our
              licensors and is protected by applicable copyright and trademark
              laws. You may not reproduce, distribute, or create derivative
              works without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              5. User Submissions
            </h2>
            <p>
              If you submit information through our forms or otherwise provide
              materials to us, you represent that you have the right to do so
              and grant us a non-exclusive license to use those submissions for
              the purposes of responding to your inquiry and delivering
              services.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              6. Third-Party Links
            </h2>
            <p>
              The Site may link to third-party sites. We are not responsible
              for the content, policies, or practices of those sites.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              7. Disclaimers
            </h2>
            <p>
              The Site is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; without warranties of any kind, whether
              express, implied, or statutory, including warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, The Buzz Marketing Co
              will not be liable for indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              Site or our services.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the State of California,
              without regard to conflict-of-laws principles. Venue for any
              dispute lies in the state or federal courts located in San Diego
              County, California.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-syne-var)] text-2xl font-bold text-foreground mb-3">
              10. Contact
            </h2>
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="tel:+17203639754" className="text-buzz-coral hover:underline">
                (720) 363-9754
              </a>{" "}
              or via{" "}
              <Link href="/contact" className="text-buzz-coral hover:underline">
                /contact
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
