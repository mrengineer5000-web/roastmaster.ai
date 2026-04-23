import React from "react";
import LegalPage, { LegalSection } from "../components/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      testId="privacy-page"
      title="Privacy Policy"
      subtitle="We take less data than you think. We keep it even shorter."
    >
      <LegalSection label="01" heading="What We Collect">
        <p>
          When you sign up we collect your name, email, and a securely hashed password (bcrypt). When you submit an idea we store the text of the idea, any uploaded file text, the generated roast, and timestamps.
        </p>
        <p>
          When you pay, Razorpay processes your card / UPI / wallet details. We never see or store your payment instrument — we only receive the order and payment IDs plus a signature for verification.
        </p>
      </LegalSection>

      <LegalSection label="02" heading="How We Use It">
        <p>
          Your idea text is sent to our AI provider solely to generate your roast. We use your email to authenticate you and, occasionally, to send important service updates. We do not sell or rent your data to anyone.
        </p>
      </LegalSection>

      <LegalSection label="03" heading="The Hall of Shame">
        <p>
          The public leaderboard only exposes the AI verdict, score, and your display name. It does not expose the raw startup idea, detailed callouts, or fixes. If you do not want your roast appearing on the public leaderboard, contact us and we will remove it.
        </p>
      </LegalSection>

      <LegalSection label="04" heading="Cookies & Storage">
        <p>
          We store a JWT token in your browser&apos;s local storage to keep you logged in. We do not use third-party advertising cookies.
        </p>
      </LegalSection>

      <LegalSection label="05" heading="Your Rights">
        <p>
          You may request a copy, correction, or deletion of your data at any time. Email us at contact@pixelbond.in and we will respond within 7 working days.
        </p>
      </LegalSection>

      <LegalSection label="06" heading="Retention">
        <p>
          We retain roasts and account data as long as your account is active. If you request deletion, we wipe your account, associated roasts, and payment records (except what we are required by law to retain) within 30 days.
        </p>
      </LegalSection>

      <LegalSection label="07" heading="Security">
        <p>
          Passwords are hashed with bcrypt. Transport is HTTPS. Payment verification uses HMAC-SHA256 signature checks. No system is bulletproof, but we treat your data like we treat our own egos: carefully.
        </p>
      </LegalSection>

      <LegalSection label="08" heading="Contact">
        <p>
          For any privacy question, email <a href="mailto:contact@pixelbond.in" className="text-[#FFD60A]">contact@pixelbond.in</a> or <a href="mailto:xenithfounders@gmail.com" className="text-[#FFD60A]">xenithfounders@gmail.com</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
