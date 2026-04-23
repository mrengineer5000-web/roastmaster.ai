import React from "react";
import LegalPage, { LegalSection } from "../components/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      testId="terms-page"
      title="Terms & Conditions"
      subtitle="Before you hand your ego to an AI, please read. Seriously."
    >
      <LegalSection label="01" heading="Acceptance">
        <p>
          By creating an account on Roastmaster (operated by XenithHQ) or using any part of the service, you agree to be bound by these Terms &amp; Conditions. If you disagree, do not use the service.
        </p>
      </LegalSection>

      <LegalSection label="02" heading="The Service">
        <p>
          Roastmaster is an entertainment + ideation tool. We use large language models to generate a critical &quot;roast&quot; of a startup idea you submit. The output is AI-generated commentary intended to help you think critically about your idea. It is not investment advice, legal advice, or professional consulting.
        </p>
      </LegalSection>

      <LegalSection label="03" heading="Account & Eligibility">
        <p>
          You must be 18 years or older to create an account. You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account is your responsibility.
        </p>
      </LegalSection>

      <LegalSection label="04" heading="Free Roast & Paid Usage">
        <p>
          Every new verified account gets one (1) free roast. After the free roast is consumed, each additional roast costs ₹49 (Indian Rupees, inclusive of applicable taxes) per roast, charged via Razorpay.
        </p>
        <p>
          Credits purchased are non-transferable and are applied to your account instantly upon successful payment verification.
        </p>
      </LegalSection>

      <LegalSection label="05" heading="Acceptable Use">
        <p>
          Do not submit content that is illegal, defamatory, infringes intellectual property, contains personal data of third parties without consent, or attempts to manipulate or exploit the service. We may suspend or terminate accounts that violate these rules.
        </p>
      </LegalSection>

      <LegalSection label="06" heading="Content & IP">
        <p>
          You retain ownership of the startup ideas and materials you submit. By submitting, you grant us a limited, non-exclusive license to process that content via our AI provider solely to generate your roast, display it back to you, and allow you to export and share it.
        </p>
        <p>
          The generated roast (score, callouts, fixes, verdict) is provided to you for personal use and social sharing. You may not resell the output.
        </p>
      </LegalSection>

      <LegalSection label="07" heading="Disclaimer">
        <p>
          The roast is automatically generated commentary and may be factually inaccurate, exaggerated, or incomplete. It is designed to be blunt and occasionally humorous. Do not rely on it as a substitute for real market research, legal counsel, or financial advice.
        </p>
      </LegalSection>

      <LegalSection label="08" heading="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, XenithHQ, its founders, and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising out of your use of Roastmaster. Our total liability shall not exceed the amount you paid us in the preceding 30 days.
        </p>
      </LegalSection>

      <LegalSection label="09" heading="Changes">
        <p>
          We may update these terms occasionally. Continued use after changes constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection label="10" heading="Governing Law">
        <p>
          These terms are governed by the laws of India. Disputes fall under the exclusive jurisdiction of the courts at Jaipur, Rajasthan.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
